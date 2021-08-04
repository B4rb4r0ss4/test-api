import appVariables from './js/base/base';
import getQuestions from './js/model/getQuestions';
import shuffleArray from './js/controlers/pureFunctions';
import { getCollections } from './js/model/getCollections';
const collections = [];
let choice;
const startApp = async () => {
  try {
    localStorage.setItem('apiKey', appVariables.apiKey);
    const collectionsArr = await getCollections();
    collections.push(...collectionsArr.collectionsArr);
    collections.forEach(e => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.appendChild(li);
      li.textContent = e;
      button.classList.add('btn');
      document.querySelector('.collections').appendChild(button);
      li.addEventListener('click', () => {
        document.querySelectorAll('.btn').forEach(el => {
          el.classList.remove('choice');
        });
        choice = e;
        button.classList.add('choice');
      });
    });
    choice = collections[0];

    document.querySelector('.start').addEventListener('click', async () => {
      try {
        localStorage.setItem('collection', choice);
        const questions = await getQuestions(
          localStorage.collection,
          appVariables.apiKey
        );
        if (document.querySelector('#questionRandom').checked) {
          shuffleArray(questions);
        }
        localStorage.setItem('play', true);
        localStorage.setItem('questions', JSON.stringify(questions));
        localStorage.setItem('currentQuestionNumber', 0);
        localStorage.setItem('questionsNumber', questions.length);
        localStorage.setItem('currentQuestion', JSON.stringify(questions[0]));
        localStorage.setItem('points', 0);
        localStorage.setItem('time', 0);
        localStorage.setItem(
          'randomAnswers',
          document.querySelector('#answerRandom').checked
        );
        localStorage.setItem('exam', document.querySelector('#exam').checked);
        const userAnswers = [];
        questions.forEach(question => {
          userAnswers.push({
            id: question._id,
            userAnswer: 0,
            i: 'i' + String(userAnswers.length),
          });
        });
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        localStorage.setItem('type', 'egzamin');
        window.location.href = '/test';
      } catch (e) {
        alert(e);
      }
    });
  } catch (e) {
    alert(e);
  }
};

startApp();
