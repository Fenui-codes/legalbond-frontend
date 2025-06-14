const mongoose = require('mongoose');

const objectionSchema = new mongoose.Schema({
  reason: { type: String, required: true },
  objectorName: { type: String, required: true },
  objectorContact: { type: String },
  date: { type: Date, default: Date.now }
});

const marriageSchema = new mongoose.Schema({
  husbandName: { type: String, required: true },
  wifeName: { type: String, required: true },
  marriageDate: { type: Date, required: true },
  location: { type: String, required: true },
  witnesses: [
    {
      name: String,
      relation: String,
      idCard: String  // added file support
    }
  ],
  couplePhoto: String,      // file upload
  husbandIdCard: String,    // file upload
  wifeIdCard: String,       // file upload

  status: {
    type: String,
    enum: ['pending', 'published', 'objected'],
    default: 'pending'
  },
  objections: [objectionSchema],

  councilType: {
    type: String,
    enum: ['residence', 'birth'],
    required: true
  },
  councilName: {
    type: String,
    required: true
  },

  likes: { type: Number, default: 0 }, // <-- add this
  objectionsCount: { type: Number, default: 0 }, // <-- add this

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Marriage || mongoose.model('Marriage', marriageSchema);