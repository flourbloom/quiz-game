// src/api/quiz.ts
import api from './http';
import type { AiQuizGenerationResponse } from '../types/quiz';

export const createQuiz = (data: unknown) =>
  api.post('/api/quiz', data);

export const getQuiz = (quizId: string) =>
  api.get(`/api/quiz/${quizId}`);

export const generateQuizFromDocument = (
  file: File,
  difficulty: string,
  questionType: string,
  numberOfQuestions: number
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('difficulty', difficulty);
  formData.append('questionType', questionType);
  formData.append('numberOfQuestions', numberOfQuestions.toString());

  return api.post<AiQuizGenerationResponse>('/api/ai/generate-quiz', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
