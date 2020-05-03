module.exports = (question) => {
    const fs = require("fs");
    let stringSimilarity = require("string-similarity");

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
        for (let i = 0; i < words.length - len; i++) {
            let ans = "";
            for (let j = 0; j < len - 1; j++) {
                ans += words[i + j] + " ";
            }
            console.log(checkWord);

            let matches = stringSimilarity.findBestMatch(question, checkWord);

            for (let i = matches.bestMatchIndex; i < matches.bestMatchIndex + len; i++) {
                console.log(words[i]);
            }

            return timestamps[matches.bestMatchIndex] + "to" + timestamps[matches.bestMatchIndex + len - 1];
        }
    } else {
        return 'Your question is too long!';
    }

};
// require('dcp-client').init().then(main).finally(() => setImmediate(process.exit))
