import axios from 'axios';

const results = async userAnswers => {
  const result = await axios.post(
    `/checkExam/${localStorage.getItem('apiKey')}`,
    { setName: localStorage.getItem('collection'), userAnswers }
  );
  return result.data;
};

export { results };
