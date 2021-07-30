import { checkIfEnd } from './checkIfEnd';
import queries from '../base/querySelectors';

const timeFormater = (time, addZeros = true) => {
  const sec = time % 60;
  const min = Math.floor(time / 60);
  if (addZeros) {
    const secFor = ('0' + sec).slice(-2);
    const minFor = ('0' + min).slice(-2);
    return `${minFor}.${secFor}`;
  }
  return `${min}.${sec}`;
};

const displayTime = time => {
  const formatedTime = timeFormater(time);
  queries.timer.textContent = formatedTime;
};

const timer = setInterval(() => {
  let time = Number(localStorage.getItem('time'));
  displayTime(time);
  if (checkIfEnd()) {
    clearInterval(timer);
  } else {
    time++;
    localStorage.setItem('time', time);
  }
}, 1000);

export { timer, displayTime, timeFormater };
