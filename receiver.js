async function main() {

    const speech = require('@google-cloud/speech');
    const fs = require('fs');

    const client = new speech.SpeechClient();
    const filename = 'assets/sample_audio.flac'

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const gcsUri = 'gs://my-bucket/audio.raw';
    // const encoding = 'Encoding of the audio file, e.g. LINEAR16';
    // const sampleRateHertz = 16000;
    // const languageCode = 'BCP-47 language code, e.g. en-US';

    const config = {
        enableWordTimeOffsets: true,
        encoding: 'FLAC',
        // sampleRateHertz: 16000,
        languageCode: 'en-US',
    };

    const audio = {
        content: fs.readFileSync(filename).toString('base64'),
    };

    const request = {
        config: config,
        audio: audio,
    };

    const [operation] = await client.longRunningRecognize(request);

    const [response] = await operation.promise();
    console.log(response);
    var transcription = "";
    var worddict = {}
    response.results.forEach(result => {
        console.log(`Transcription: ${result.alternatives[0].transcript}`);
        transcription += result.alternatives[0].transcript;
        result.alternatives[0].words.forEach(wordInfo => {
            const startSecs =
            `${wordInfo.startTime.seconds}` +
            '.' +
            wordInfo.startTime.nanos / 100000000;
            const endSecs =
            `${wordInfo.endTime.seconds}` +
            '.' +
            wordInfo.endTime.nanos / 100000000;
            console.log(`Word: ${wordInfo.word}`);
            console.log(`\t ${startSecs} secs - ${endSecs} secs`);
            worddict[startSecs] = wordInfo.word;
        });
    });
    fs.writeFileSync('assets/sample.txt', transcription);
    fs.writeFileSync("assets/sample.json", JSON.stringify(worddict));
    // const [response] = await client.recognize(request);
    // const transcription = response.results
    //     .map(result => result.alternatives[0].transcript)
    //     .join('\n');
    // console.log(`Transcription: ${transcription}`);
    // fs.writeFileSync('assets/sample.txt', transcription);
}
main().catch(console.error);
