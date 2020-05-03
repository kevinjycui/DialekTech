var ffmpeg = require('fluent-ffmpeg');

function convert(input, output, callback) {
  ffmpeg(input)
      .output(output)
      .on('end', function() {                    
          console.log('conversion ended');
          callback(null);
      }).on('error', function(err){
          console.log('error: ', e.code, e.msg);
          callback(err);
      }).run();
}

module.exports = (audioSource) => {
  convert('./public/uploads/video.mp4', audioSource, function(err){
    if(!err) {
        console.log('mp4 to mp3 conversion complete');
    }
  });
  var command = ffmpeg({
    source: audioSource
  })
  .addOption('-ac', 1)
  .saveToFile('./public/uploads/audio.flac');
}
