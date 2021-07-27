const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const auth = require('../middleware/auth');
const questionSchema = require('../models/question');

router.post('/addQuestions/:name/:key', auth, async (req, res) => {
  try {
    const name = req.params.name;
    const questions = [...req.body];
    const QuestionSet = mongoose.model(name, questionSchema);
    questions.forEach(async question => {
      const q = new QuestionSet(question);
      await q.save();
    });
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/getSet/:name/:key', auth, async (req, res) => {
  try {
    const name = req.params.name;
    const QuestionSet = mongoose.model(name, questionSchema);
    const questions = await QuestionSet.find({});
    res.send(questions);
  } catch (e) {
    res.status(500).send();
  }
});

router.get(
  '/checkAnswer/:name/:id/:userAnswer/:key',
  auth,
  async (req, res) => {
    try {
      const name = req.params.name;
      const id = req.params.id;
      const userAnswer = req.params.userAnswer;
      const QuestionSet = mongoose.model(name, questionSchema);
      const question = await QuestionSet.findById(id);
      const result = userAnswer === question.correctAnswer;
      res.send({ result: result });
    } catch (e) {
      res.status(500).send();
    }
  }
);

module.exports = router;
