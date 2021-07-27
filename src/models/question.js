const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  Question: {
    type: String,
    required: true,
  },
  a: { type: String, required: true },
  b: { type: String, required: true },
  c: { type: String, required: true },
  d: { type: String, required: true },
  correctAnswer: { type: String, required: true },
});

questionSchema.methods.toJSON = function () {
  const question = this;
  const questionObject = question.toObject();

  delete questionObject.correctAnswer;
  delete questionObject.__v;
  return questionObject;
};
module.exports = questionSchema;
