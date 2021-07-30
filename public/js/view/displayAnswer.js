import { switchCSSClass } from './displayQuestion';
import { getCorrectAnswer } from '../model/getCorrectAnswer';
import { displayQuestion } from './displayQuestion';

const displayAnswer = async (result, answer, answers) => {
  try {
    const questionSet = localStorage.getItem('collection');
    const questionId = JSON.parse(localStorage.getItem('currentQuestion'))._id;
    const apiKey = localStorage.getItem('apiKey');

    switchCSSClass(answers, 'click');
    if (result) {
      document.getElementById(answer.id).classList.add('correct');
    } else if (!result) {
      document.getElementById(answer.id).classList.add('wrong');
      const correctAnswer = await getCorrectAnswer(
        questionSet,
        questionId,
        apiKey,
        answer.id
      );
      document.getElementById(correctAnswer.answer).classList.add('correct');
    }
    document.querySelector('.status').innerHTML =
      '<button class="btn">Następne pytanie <i class="fas fa-forward"></i></button>';
    document.querySelector('.btn').addEventListener('click', displayQuestion);
  } catch (e) {
    alert(e);
  }
};

export { displayAnswer };
