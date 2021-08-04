import { generateQuestions } from './js/controlers/generateExam';
generateQuestions();

import { timer, displayTime } from './js/controlers/timer';
displayTime(Number(localStorage.getItem('time')));
timer;

import { addAnswersFunction } from './js/controlers/addExamAnswersFunction';
addAnswersFunction();

import { examEnd } from './js/controlers/addEndExamFunction';
examEnd();
