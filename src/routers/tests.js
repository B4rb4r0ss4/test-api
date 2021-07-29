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
    await Promise.all(
      questions.map(async question => {
        const q = new QuestionSet(question);
        return await q.save();
      })
    );
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

router.get('/collections/:key', auth, async (req, res) => {
  try {
    mongoose.connection.db.listCollections().toArray((err, names) => {
      const collectionsArr = names.map(name => name.name);
      res.send({ collectionsArr });
    });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
