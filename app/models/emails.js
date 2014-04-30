var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var emailSchema = new Schema({
  date: { type: Date, default: Date.now },
  email: String
});

module.exports = mongoose.model('Emails', emailSchema);