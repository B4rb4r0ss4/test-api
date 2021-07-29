import { getAnswer } from './answer';
const getCorrectAnswer = async (
  questionSet,
  questionId,
  apiKey,
  userAnswer
) => {
  const requests = ['a', 'b', 'c', 'd'].filter(req => req !== userAnswer.id);
  const results = await Promise.all(
    requests.map(async req => {
      const { data } = await getAnswer(req, questionSet, questionId, apiKey);
      return {
        answer: req,
        result: data.result,
      };
    })
  );
  return (correctAnswer = results.find(el => el.result === true));
};
export { getCorrectAnswer };
