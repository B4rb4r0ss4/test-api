import { getAnswer } from '../model/getAnswer';
import { displayAnswer } from '../view/displayAnswer';
import { switchCSSClass } from '../view/displayQuestion';
const addAnswersFunctions = answers => {
  let result;
  answers.forEach(answer => {
    answer.addEventListener('click', async () => {
      if (answer.classList.contains('click')) {
        switchCSSClass(answers, 'click');
        try {
          const points = Number(localStorage.getItem('points'));
          const { data } = await getAnswer(answer.id);
          data.result && localStorage.setItem('points', points + 1);

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
