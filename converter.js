var FFmpeg = require('fluent-ffmpeg');

var command = FFmpeg({
    source: 'assets/sample_audio.mp3'
}).addOption('-ac', 1)
.saveToFile('assets/sample_audio.flac');