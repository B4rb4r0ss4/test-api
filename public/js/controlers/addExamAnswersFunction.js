const addAnswersFunction = () => {
  const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));

  document.querySelectorAll('.answersBtn').forEach(el => {
    // console.log(userAnswers);
    const currentQuestion = userAnswers.find(
      ele => ele.id === el.parentNode.id
    );
    const answers = document.getElementById(el.id).childNodes;

    userAnswers.forEach((e, i) => {
      //console.log(e);
      if (e.userAnswer != 0 && e.id === currentQuestion.id) {
        document.querySelectorAll(`.i${i}`).forEach(ele => {
          ele.id === currentQuestion.userAnswer && ele.classList.add('clicked');
        });
      }
    });

    el.addEventListener('click', () => {
      currentQuestion.userAnswer = el.id;

      const currentClass = '.' + currentQuestion.i;
      const answersBtn = document.querySelectorAll(currentClass);
      answersBtn.forEach(e => e.classList.remove('clicked'));
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
      el.classList.add('clicked');
      console.log('clicked');
    });
  });
};

export { addAnswersFunction };
