var ffmpeg = require('fluent-ffmpeg');
const path = require('path');

function convert(input, output) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .output(output)
      .on('end', function() {
        console.log('conversion ended');
        resolve()
      })
      .on('error', function(err) {
        console.log('error: ', err);
        reject(err);
      });
  });
}

module.exports = async (audioSource) => {
  await convert('/public/uploads/video.mp4', audioSource)
    .then(() => {
      ffmpeg({ source: audioSource }).addOption('-ac', 1)
        .saveToFile(path.join(__dirname, '..', 'public/uploads/audio.mp3'));
      var command = ffmpeg({
        source: audioSource
      })
        .addOption('-ac', 1)
        .saveToFile(path.join(__dirname, '..', 'public/uploads/audio.flac'));
    })
    .catch(err => {
      console.log('mp4 to mp3 failed: ' + err);
    });


}
