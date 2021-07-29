import axios from 'axios';

const getAnswer = async answer => {
  const questionSet = localStorage.getItem('collection');
  const questionID = JSON.parse(localStorage.getItem('currentQuestion'))._id;
  const apiKey = localStorage.getItem('apiKey');
  const data = await axios.get(
    `/checkAnswer/${questionSet}/${questionID}/${answer}/${apiKey}`
  );
  return data;
};

export { getAnswer };
