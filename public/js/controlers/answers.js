import { getAnswer } from '../model/answer';
import { displayAnswer } from '../view/answersView';
import { displayQuestion } from '../view/questionView';
import base from '../base/base';
const addAnswersFunctions = answers => {
  let result;
  answers.forEach(answer => {
    answer.addEventListener('click', async () => {
      if (answer.classList.contains('click')) {
        try {
          const points = Number(localStorage.getItem('points'));
          const { data } = await getAnswer(answer.id);
          if (data.result) {
            localStorage.setItem('points', points + 1);
          }
          displayAnswer(data.result, answer, answers);
          const current = localStorage.getItem('currentQuestionNumber');
          let number = Number(current);
          number++;
          localStorage.setItem('currentQuestionNumber', number);
          localStorage.setItem(
            'currentQuestion',
            JSON.stringify(
              JSON.parse(localStorage.getItem('questions'))[number]
            )
          );
        } catch (e) {
          alert(e);
        }
      }
    });
  });

  return result;
};

export { addAnswersFunctions };
