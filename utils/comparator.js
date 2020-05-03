const dcpClient = require('dcp-client');
dcpClient.init().then(() => {
 // DCP Client is ready
 const compute = require('dcp/compute');
});

const fs = require("fs");
let stringSimilarity = require("string-similarity");

module.exports = (question) => {

    //removed let question

    question = question.trim();
    console.log(question);

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
      job = compute(0, words.length-len, function(i) {
            let ans = "";
            for (let j = 0; j < len - 1; j++) {
                ans += words[i + j] + " ";
            }
            console.log(checkWord);

            let matches = stringSimilarity.findBestMatch(question, checkWord);

            for (let i = matches.bestMatchIndex; i < matches.bestMatchIndex + len; i++) {
                console.log(words[i]);
            }
            
            console.log(timestamps[matches.bestMatchIndex] + "to" + timestamps[matches.bestMatchIndex + len - 1]);
            return [timestamps[matches.bestMatchIndex], timestamps[matches.bestMatchIndex + len - 1]];
      });
    } else {
        return 'Your question is too long!';
    }

};
// require('dcp-client').init().then(main).finally(() => setImmediate(process.exit))
