var FFmpeg = require('fluent-ffmpeg');

var command = FFmpeg({
    source: './public/uploads/audio.mp3'
}).addOption('-ac', 1)
.saveToFile('./public/uploads/audio.flac');
