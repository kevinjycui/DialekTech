const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  words: [String],
  timestamps: [Number]
})

const Entry = mongoose.model('Entry', EntrySchema);
module.exports = Entry;

