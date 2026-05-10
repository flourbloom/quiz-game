// src/api/quiz.ts
import api from './http';

export const createQuiz = (data: unknown) =>
  api.post('/api/quiz', data);

export const getQuiz = (quizId: string) =>
  api.get(`/api/quiz/${quizId}`);
