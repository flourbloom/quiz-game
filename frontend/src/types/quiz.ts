// src/types/quiz.ts
export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  choices: string[];
  answer: string;
}
