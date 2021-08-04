const generateQuestions = () => {
  const questions = JSON.parse(localStorage.getItem('questions'));
  document.querySelector('output').textContent = `${localStorage.getItem(
    'questionsNumber'
  )} pytań`;
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
  questions.forEach((question, i) => {
    const html = `
      <li>
        <header class="question-title">${i + 1}. ${question.Question}</header>
        <ul class="answersUl" id="${question._id}">
          <button class="answersBtn i${i} button" id="a">
            <li class="answers">
                ${question.a}
            </li>
          </button>
          <button class="answersBtn i${i} button" id="b">
            <li class="answers">
                ${question.b}
            </li>
          </button>
          <button class="answersBtn i${i} button" id="c">
            <li class="answers">
                ${question.c}
            </li>
          </button>
          <button class="answersBtn i${i} button" id="d"'>
            <li class="answers">
                ${question.d}
            </li>
          </button>
        </ul>
      </li>
`;

    document.querySelector('.questions').insertAdjacentHTML('beforeend', html);
  });
};

export { generateQuestions };
