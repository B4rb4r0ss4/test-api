import axios from 'axios';

const getQuestions = async (questionSet, apiKey) => {
  try {
    console.log(questionSet);
    const data = await axios.get(`/getSet/${questionSet}/${apiKey}`);
    console.log(data);
    return data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default getQuestions;
