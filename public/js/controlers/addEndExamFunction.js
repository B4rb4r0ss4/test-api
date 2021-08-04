import { results } from '../model/getExamAnswers';
const generateBtn = () => {
  const end = document.querySelector('.end');
  end.textContent = 'Powrót';
  end.addEventListener('click', () => {
    window.location.href = '/';
  });
};

const finishExam = async () => {
  localStorage.setItem('play', false);
  generateBtn();

  document.querySelectorAll('.answersBtn').forEach(btn => {
    btn.classList.remove('button');
    const elClone = btn.cloneNode(true);
    btn.parentNode.replaceChild(elClone, btn);
  });

  const { examResults, points } = await results(
    JSON.parse(localStorage.getItem('userAnswers'))
  );
  const answersBtn = document.querySelectorAll('.answersBtn');
  examResults.forEach(result => {
    const answersUl = document.querySelectorAll('.answersUl');

    const answers = [...document.getElementById(result.id).childNodes];
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    const btns = answers.filter(el => {
      if (el.id) return el;
    });

    btns.forEach(btn => {
      btn.classList.add('ends');
      if (btn.id === result.answer) {
        btn.classList.add('correct');
      } else if (btn.classList.contains('clicked')) {
        btn.classList.add('wrong');
      }
      btn.classList.remove('clicked');
    });
  });

  document.querySelector('.sub').textContent = 'Wyniki:';
  document.querySelector('output').textContent = `${points} / ${
    examResults.length
  },  czyli ${Math.round((points / examResults.length) * 100)}%`;
};
const examEnd = () => {
  if (localStorage.getItem('play') === 'false') {
    finishExam();
  } else {
    document.querySelector('.end').addEventListener('click', finishExam);
  }
};

export { examEnd };
