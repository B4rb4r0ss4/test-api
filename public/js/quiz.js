import queries from './base/querySelectors';
import { displayQuestion } from './view/displayQuestion';
import { addAnswersFunctions } from './controlers/addAnswersFunctions';
import { timer, displayTime } from './controlers/timer';

const play = async () => {
  if (localStorage.getItem('exam') === 'false') {
    displayQuestion();

    addAnswersFunctions(queries.answers);
    displayTime(Number(localStorage.getItem('time')));
    timer;
  } else if (localStorage.getItem('exam') === 'true') {
    window.location.href = '/egzamin';
  }
};

play();
