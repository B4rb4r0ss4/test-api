import appVariables from './js/base/base';
import getQuestions from './js/model/questions';
import shuffleArray from './js/controlers/pureFunctions';
import { getCollections } from './js/model/getCollections';
const collections = [];
let choice;
const startApp = async () => {
  try {
    localStorage.setItem('apiKey', appVariables.apiKey);
    const collectionsArr = await getCollections();
    collections.push(...collectionsArr.collectionsArr);
    console.log(collections);
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
        console.log(choice);
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
        console.log(questions);
        shuffleArray(questions);
        localStorage.setItem('questions', JSON.stringify(questions));
        localStorage.setItem('currentQuestionNumber', 0);
        localStorage.setItem('questionsNumber', questions.length);
        localStorage.setItem('currentQuestion', JSON.stringify(questions[0]));
        localStorage.setItem('points', 0);
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
