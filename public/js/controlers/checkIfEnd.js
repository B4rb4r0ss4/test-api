const checkIfEnd = () => {
  if (
    Number(localStorage.getItem('currentQuestionNumber')) ===
      Number(localStorage.getItem('questionsNumber')) ||
    localStorage.getItem('play') === 'false'
  ) {
    return true;
  } else return false;
};

export { checkIfEnd };
