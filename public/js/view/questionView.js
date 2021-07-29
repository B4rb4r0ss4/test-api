import shuffleArray from '../controlers/pureFunctions';
import base from '../base/base';
import queries from '../base/querySelectors';
import { checkIfEnd } from '../controlers/checkIfEnd';
const switchCSSClass = (allSelector, cssClass) =>
  allSelector.forEach(el => {
    el.classList.toggle(cssClass);
  });

const removeCorrectAndWrongAnswer = answers => {
  answers.forEach(el => {
    el.classList.remove('correct');
    el.classList.remove('wrong');
  });
};

const displayQuestion = async () => {
  const { status, title, output, answers, ul } = queries;
  if (!checkIfEnd()) {
    const question = JSON.parse(localStorage.getItem('currentQuestion'));
    const questionNumber = localStorage.getItem('currentQuestionNumber');
    const numberOfAllQuestions = localStorage.getItem('questionsNumber');
    const { a, b, c, d, Question } = JSON.parse(
      localStorage.getItem('currentQuestion')
    );

    const answersArray = [a, b, c, d];
    status.innerHTML = 'Zaznacz odpowiedź: ';

    //shuffleArray(answersArray);
    title.textContent = Question;

    answers.forEach((el, i) => {
      el.textContent = answersArray[i];
      el.id = Object.keys(question).find(
        key => question[key] === answersArray[i]
      );
    });

    output.textContent = `${
      Number(questionNumber) + 1
    }/${numberOfAllQuestions}`;
    removeCorrectAndWrongAnswer(answers);
    switchCSSClass(answers, 'click');
  } else {
    const points = Number(localStorage.getItem('points'));
    const questionsNumber = Number(localStorage.getItem('questionsNumber'));
    const percentage = Math.round((points / questionsNumber) * 100);
    output.textContent = `WYNIKI:`;
    title.innerHTML = `Twoj wynik to: <span>${points} na ${questionsNumber}</span>, czyli <span>${percentage}%</span>`;
    status.innerHTML = ``;
    output.innerHTML = ``;
    ul.innerHTML = ``;
  }
};

export { displayQuestion, switchCSSClass };
