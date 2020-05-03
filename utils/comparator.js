const fs = require("fs");
let stringSimilarity = require("string-similarity");

module.exports = async (question) => {

    const compute = require('dcp/compute');

    //removed let question

    question = question.trim();

    if (
        question.charAt(question.length - 1) >= 33 ||
        question.charAt(question.length - 1) <= 47
    ) {
        question = question.substring(0, question.length - 1);
    }

    let len = question.split(" ").length;
    let timeJSON = JSON.parse(
        fs.readFileSync("./public/responses/response.json", "utf8")
    );
    const timestamps = Object.keys(timeJSON);
    const words = Object.values(timeJSON);
    let checkWord = [];

    if (len <= words.length) {
      job = compute.for(0, words.length-len, function(i, words, len) {
        progress();
        let ans = "";

        for (let j = 0; j < len - 1; j++) {
            ans += words[i + j] + " ";
        }
        return ans
      });

      job.on('accepted', () => console.log("Job accepted", job.id));
      job.on('complete', () => console.log("Job complete!"));
      let results = await job.exec();
      console.log('results: ', results);
      console.log('entries: ', results.entries());
      console.log('fromEntries:', results.fromEntries());
      console.log('keys: ', results.keys());
      console.log('values: ', results.values());
      console.log('key(2): ', results.key(2));

      checkWord = results.values();

      let matches = stringSimilarity.findBestMatch(question, checkWord);

      for (let i = matches.bestMatchIndex; i < matches.bestMatchIndex + len; i++) {
          console.log(words[i]);
      }
      
      console.log(timestamps[matches.bestMatchIndex] + "to" + timestamps[matches.bestMatchIndex + len - 1]);
      return [timestamps[matches.bestMatchIndex], timestamps[matches.bestMatchIndex + len - 1]];
    } else {
        return 'Your question is too long!';
    }

};
