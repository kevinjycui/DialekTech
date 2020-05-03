const fs = require('fs');
const FFmpeg = require('fluent-ffmpeg');
const receiver = require('../utils/receiver');
const comparator = require('../utils/comparator');

module.exports = async (req, res) => {
  let uploadLocation = __dirname + '/public/uploads/audio.mp3'
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
  FFmpeg({ source: uploadLocation }).addOption('-ac', 1)
    .saveToFile('./public/uploads/audio.flac');
  const entry = await receiver("./public/uploads/audio.flac");
  comparator("Sample question here"); //put the question here
  res.redirect(entry._id, `/video/${entry._id}`);
}