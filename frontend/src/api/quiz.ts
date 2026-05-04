// src/api/quiz.ts
import axios from 'axios';

export const createQuiz = (data: any) =>
  axios.post('/api/quiz', data);

export const getQuiz = (quizId: string) =>
  axios.get(`/api/quiz/${quizId}`);
