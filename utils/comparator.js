// const dcpClient = require('dcp-client');
// dcpClient.init()
// const compute = require('dcp/compute');

const fs = require("fs");
let stringSimilarity = require("string-similarity");

module.exports = async (question) => {

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
        // job = compute.for(0, words.length-len, function(i) {
        for (let i = 0; i < words.length - len; i++) {
            let ans = "";
            for (let j = 0; j < len - 1; j++) {
                ans += words[i + j] + " ";
            } ans += words[i + len - 1];
            checkWord.push(ans);
        }
        // });

        // job.on('accepted', () => console.log("Job accepted", job.id));
        // job.on('complete', () => console.log("Job complete!"));
        // let results = await job.exec();
        // console.log('results: ', results);
        // console.log('entries: ', results.entries());
        // console.log('fromEntries:', results.fromEntries());
        // console.log('keys: ', results.keys());
        // console.log('values: ', results.values());
        // console.log('key(2): ', results.key(2));
        // console.log(checkWord);

        // job.on('uncaughtException', (event) => {
        //   console.error("An exception was thrown by the work function:", event.message);
        //  });
        // await job.exec();

        let matches = stringSimilarity.findBestMatch(question, checkWord);
        let ret = "";
        for (let i = matches.bestMatchIndex; i < matches.bestMatchIndex + len; i++) {
            console.log(words[i]);
            ret += words[i] + " ";
        }

        console.log(timestamps[matches.bestMatchIndex] + "to" + timestamps[matches.bestMatchIndex + len - 1]);
        return {
            start: timestamps[matches.bestMatchIndex],
            end: timestamps[matches.bestMatchIndex + len - 1],
            text: ret, // sentence goes here
        };
    } else {
        return 'Your question is too long!';
    }

};

// let main = async (question) => {

//   //removed let question

//   question = question.trim();
//   console.log(question);

//   if (
//       question.charAt(question.length - 1) >= 33 ||
//       question.charAt(question.length - 1) <= 47
//   ) {
//       question = question.substring(0, question.length - 1);
//   }

//   let len = question.split(" ").length;
//   let timeJSON = JSON.parse(
//       fs.readFileSync("./public/responses/response.json", "utf8")
//   );
//   const timestamps = Object.keys(timeJSON);
//   const words = Object.values(timeJSON);
//   let checkWord = [];

//   if (len <= words.length) {
//     job = compute.for(0, words.length-len, function(i) {
//           let ans = "";
//           for (let j = 0; j < len - 1; j++) {
//               ans += words[i + j] + " ";
//           }
//     });
//     console.log(job);

//     job.on('accepted', () => console.log("Job accepted", job.id));
//     job.on('complete', () => console.log("Job complete!"));
//     let results = await job.exec();
//     console.log('results: ', results);
//     console.log('entries: ', results.entries());
//     console.log('fromEntries:', results.fromEntries());
//     console.log('keys: ', results.keys());
//     console.log('values: ', results.values());
//     console.log('key(2): ', results.key(2));
//     console.log(checkWord);

//     job.on('uncaughtException', (event) => {
//       console.error("An exception was thrown by the work function:", event.message);
//      });

//     let matches = stringSimilarity.findBestMatch(question, checkWord);

//     for (let i = matches.bestMatchIndex; i < matches.bestMatchIndex + len; i++) {
//         console.log(words[i]);
//     }

//     console.log(timestamps[matches.bestMatchIndex] + "to" + timestamps[matches.bestMatchIndex + len - 1]);
//     return [timestamps[matches.bestMatchIndex], timestamps[matches.bestMatchIndex + len - 1]];
//   } else {
//       return 'Your question is too long!';
//   }

// };
// main('whatever coloumbs').catch(console.error);