var FFmpeg = require("fluent-ffmpeg");
exports.converter = (audioSource) => {
  
    var command = FFmpeg({
      source: audioSource, //changed this line
    })
      .addOption("-ac", 1)
      .saveToFile("./public/uploads/audio.flac");
  };
