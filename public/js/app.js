import queries from './base/querySelectors';
import { displayQuestion } from './view/questionView';
import { addAnswersFunctions } from './controlers/answers';

const play = async () => {
  displayQuestion();
  addAnswersFunctions(queries.answers);
};

export default play;
