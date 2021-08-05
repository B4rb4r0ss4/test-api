import shuffleArray from './pureFunctions';
const generateQuestions = () => {
  const questions = JSON.parse(localStorage.getItem('questions'));
  document.querySelector('output').textContent = `${localStorage.getItem(
    'questionsNumber'
  )} pytań`;
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));

  questions.forEach((question, i) => {
    const { a, b, c, d } = question;
    const answers = [a, b, c, d];
    let shuffle = localStorage.getItem('randomAnswers');
    if (shuffle == 'true') {
      shuffleArray(answers);
    }
    const ids = [];
    answers.forEach((el, ind) => {
      const idEl = Object.keys(question).find(
        key => question[key] === answers[ind]
      );

      ids.push(idEl);
    });
    const html = `
      <li>
        <header class="question-title">${i + 1}. ${question.Question}</header>
        <ul class="answersUl" id="${question._id}">
          <button class="answersBtn i${i} button" id="${ids[0]}">
            <li class="answers">
                ${answers[0]}
            </li>
          </button>
          <button class="answersBtn i${i} button" id="${ids[1]}">
            <li class="answers">
                ${answers[1]}
            </li>
          </button>
          <button class="answersBtn i${i} button" id="${ids[2]}">
            <li class="answers">
                ${answers[2]}
            </li>
          </button>
          <button class="answersBtn i${i} button" id="${ids[3]}">
            <li class="answers">
                ${answers[3]}
            </li>
          </button>
        </ul>
      </li>
`;

    document.querySelector('.questions').insertAdjacentHTML('beforeend', html);
  });
};

export { generateQuestions };
