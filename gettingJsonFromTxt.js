const fs = require('fs');
const path = require('path');

const loadQuestionsFromTxt = () => {
  try {
    return fs.readFileSync(path.join(__dirname, 'questions.txt')).toString();
  } catch (e) {
    return '';
  }
};
const questions = [];

const formatTxtToArray = data => data.split('\n\n');

questions.push(...formatTxtToArray(loadQuestionsFromTxt()));

const changedToObjects = questions.map(question => {
  const questionArray = question.split('\n');
  questionArray.shift();

  const answers = questionArray.map(e => e);
  answers.shift();

  let correctAnswer;

  const answersFormatted = answers.map(answer => {
    const answerSplitted = answer.split('$*$');
    if (answerSplitted[0].startsWith('-'))
      correctAnswer = answerSplitted[0][1].toLowerCase();

    return answerSplitted[1];
  });
  console.log();
  return {
    Question: questionArray[0],
    a: answersFormatted[0],
    b: answersFormatted[1],
    c: answersFormatted[2],
    d: answersFormatted[3],
    correctAnswer,
  };
});

fs.writeFileSync('questions.json', JSON.stringify(changedToObjects));
