const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const newsSchema = new mongoose.Schema({
  provider: String,
  date: Date,
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  stored: {
    type: Date,
    default: Date.now
  },
  image: String
});

module.exports = mongoose.model('News', newsSchema);
