const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);