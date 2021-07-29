const questions = [];
const apiKey = 'h0hB6CyIGzbAuPND';
let currentQuestion = 0;
let points = 0;
let questionSet;
const answers = document.querySelectorAll('.answers');
const ul = document.querySelector('.questions');

const start = set => {
  questionSet = set;
  getQuestions().then(async data => {
    try {
      questions.push(...data);
      shuffleArray(questions);
      generateQuestion();
    } catch (e) {
      console.log(e);
    }
  });
};

const getQuestions = async () => {
  try {
    const data = await fetch(
      `http://localhost:3000/getSet/${questionSet}/${apiKey}`
    );
    return await data.json();
  } catch (e) {
    return [];
  }
};

const generateQuestion = async () => {
  removeCorrectAndWrongAnswer();
  removeCSSClass(answers, 'click');
  document.querySelector('.status').innerHTML = 'Zaznacz odpowiedź: ';
  const object = questions[currentQuestion];
  const { a, b, c, d } = questions[currentQuestion];
  document.querySelector('.title').textContent = object.Question;

  const answersArray = [a, b, c, d];
  shuffleArray(answersArray);
  answers.forEach((el, i) => {
    el.textContent = answersArray[i];
    el.id = Object.keys(object).find(key => object[key] === answersArray[i]);
  });

  document.querySelector('output').textContent = `${currentQuestion + 1}/${
    questions.length
  }`;
};

const getAnswer = async answer => {
  const sth = await fetch(
    `/checkAnswer/${questionSet}/${questions[currentQuestion]._id}/${answer}/${apiKey}`
  );
  return await sth.json();
};

const shuffleArray = arr => {
  arr.sort(() => Math.random() - 0.5);
};

const displayAnswer = async (result, answer) => {
  try {
    if (result) {
      document.getElementById(answer.id).classList.add('correct');
      points++;
    } else {
      document.getElementById(answer.id).classList.add('wrong');
      const requests = ['a', 'b', 'c', 'd'].filter(req => req !== answer.id);
      const results = await Promise.all(
        requests.map(async req => {
          const { result } = await getAnswer(req);
          return {
            answer: req,
            result,
          };
        })
      );
      correctAnswer = results.find(el => el.result === true);
      document.getElementById(correctAnswer.answer).classList.add('correct');
    }
    removeCSSClass(answers, 'click');
    document.querySelector('.status').innerHTML =
      '<button class="btn">Następne pytanie <i class="fas fa-forward"></i></button>';
  } catch (e) {
    alert(e);
  }
};

answers.forEach(answer => {
  answer.addEventListener('click', async () => {
    if (answer.classList.contains('click')) {
      try {
        const { result } = await getAnswer(answer.id);
        displayAnswer(result, answer);
        currentQuestion++;
        document
          .querySelector('.status')
          .addEventListener('click', generateQuestion);

        console.log(points);
      } catch (e) {
        alert(e);
      }
    }
  });
});

start('pytania2022');
