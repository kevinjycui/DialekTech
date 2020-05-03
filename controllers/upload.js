const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const receiver = require('../utils/receiver');
const comparator = require('../utils/comparator');
const converter = require('../utils/converter');
const path = require('path');

module.exports = async (req, res) => {
  let uploadLocation = path.join(__dirname, "..", "public", "uploads", "audio.flac");
  console.log(uploadLocation);
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
  ffmpeg({ source: path.join(__dirname, '..', '/public/uploads/audio.mp3') }).addOption('-ac', 1)
    .saveToFile(uploadLocation);
  const entry = receiver(path.join(__dirname, "..", "public", "uploads", "audio.flac")).catch(console.error);
  // comparator("Sample question here"); //put the question here
  res.redirect(entry._id, `/video/${entry._id}`);
}