const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
  transcription: {
    type: String,
    required: true
  },
  timestamps: {
    type: Object,
    required: true
  }
})

const Entry = mongoose.model('Entry', EntrySchema);
module.exports = Entry;

