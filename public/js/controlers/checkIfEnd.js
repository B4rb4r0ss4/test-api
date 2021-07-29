const checkIfEnd = () => {
  if (
    Number(localStorage.getItem('currentQuestionNumber')) ===
    Number(localStorage.getItem('questionsNumber'))
  ) {
    return true;
  } else return false;
};

export { checkIfEnd };
