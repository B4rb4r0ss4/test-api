import queries from '../base/querySelectors';
import { timeFormater } from '../controlers/timer';
const displayResults = () => {
  const points = Number(localStorage.getItem('points'));
  const questionsNumber = Number(localStorage.getItem('questionsNumber'));
  const time = timeFormater(Number(localStorage.getItem('time')), false);
  const percentage = Math.round((points / questionsNumber) * 100);
  let percentageColor;
  if (percentage >= 90) percentageColor = '#49D615';
  else if (percentage >= 80) percentageColor = '#a3ba0b';
  else if (percentage >= 60) percentageColor = '#f1ff76';
  else if (percentage >= 40) percentageColor = '#fa6500';
  else if (percentage >= 0) percentageColor = '#e91100';

  const [min, seconds] = time.split('.');
  queries.container.classList.remove('quiz');
  queries.container.classList.add('container');
  queries.container.innerHTML = `
    <h2 class="results">Wyniki:</h2>
    <p><span class="result-text">Test wykonano w ciągu:</span> <span class="time-result resultOut">${min} min. i ${seconds} s. </span></p>
    <p><span class="result-text">Poprawnie odpowiedzieno na:</span> <span class="correct-result resultOut">${points} pytań</span></p>
    <p><span class="result-text">Niepoprawnie odpowiedzieno na:</span> <span class="wrong-result resultOut">${
      questionsNumber - points
    } pytań</span></p>
    <p><span class="result-text">Czyli:</span> <span class="percentage resultOut" style="color: ${percentageColor}">${percentage}%</span>  </p>
    <button class="return">Powrót do Menu: <i class="fas fa-undo"></button></i>
  `;

  document.querySelector('.return').addEventListener('click', () => {
    window.location.href = '/';
  });
};
export { displayResults };
