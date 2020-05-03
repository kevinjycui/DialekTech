exports.converter = (audioSource) => {
  var FFmpeg = require("fluent-ffmpeg");

  var command = FFmpeg({
    source: audioSource, //changed this line
  })
    .addOption("-ac", 1)
    .saveToFile("./public/uploads/audio.flac");
};

exports.receiver = (fileName) => {
  async function main() {
    const speech = require("@google-cloud/speech");
    const fs = require("fs");
    //removed the filename line

    const client = new speech.SpeechClient();

    const config = {
      enableWordTimeOffsets: true,
      encoding: "FLAC",
      // sampleRateHertz: 16000,
      languageCode: "en-US",
    };

    const audio = {
      content: fs.readFileSync(fileName).toString("base64"),
    };

    const request = {
      config: config,
      audio: audio,
    };

    const [operation] = await client.longRunningRecognize(request);

    const [response] = await operation.promise();
    console.log(response);
    var transcription = "";
    var worddict = {};
    response.results.forEach((result) => {
      console.log(`Transcription: ${result.alternatives[0].transcript}`);
      transcription += result.alternatives[0].transcript;
      result.alternatives[0].words.forEach((wordInfo) => {
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          "." +
          wordInfo.startTime.nanos / 100000000;
        const endSecs =
          `${wordInfo.endTime.seconds}` +
          "." +
          wordInfo.endTime.nanos / 100000000;
        console.log(`Word: ${wordInfo.word}`);
        console.log(`\t ${startSecs} secs - ${endSecs} secs`);
        if (startSecs in worddict) {
          worddict[startSecs] += " " + wordInfo.word;
        } else {
          worddict[startSecs] = wordInfo.word;
        }
      });
    });
    fs.writeFileSync("./public/responses/response.txt", transcription);
    fs.writeFileSync(
      "./public/responses/response.json",
      JSON.stringify(worddict)
    );
  }
  main().catch(console.error);
};

exports.comparator = (question) => {
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
      ans += words[i + len - 1];
      checkWord.push(ans);
    }
    console.log(checkWord);

    let matches = stringSimilarity.findBestMatch(question, checkWord);

    for (
      let i = matches.bestMatchIndex;
      i < matches.bestMatchIndex + len;
      i++
    ) {
      console.log(words[i]);
    }

    console.log(
      `${timestamps[matches.bestMatchIndex]} to ${
        timestamps[matches.bestMatchIndex + len - 1]
      }`
    );
  } else {
    console.log("Your question is too long!");
  }
};

exports.displayer = () => {
  const fs = require("fs");

  let div = document.createElement("div");
  div.className = "output";

  fs.readFile("public/responses/responses.txt", (err, data) => {
    if (err) throw err;

    div.createTextNode(data.toString());
  });

  let main = document.getElementById("main");
  main.appendChild(div);
};
