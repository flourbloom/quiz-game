// src/types/quiz.ts

// Question Types
export const QuestionType = {
  MCQ: 'MCQ',
  SHORT_ANSWER: 'SHORT_ANSWER',
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

// Difficulty Levels
export const DifficultyLevel = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const;

export type DifficultyLevel = (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices?: string[];
  answer: string;
  difficulty?: DifficultyLevel;
}

export interface GeneratedAiQuestion {
  question: string;
  type: QuestionType | 'COMBINATION' | string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  correctAnswer?: string;
  difficulty?: DifficultyLevel | string;
}

export interface AiQuizGenerationRequest {
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  numberOfQuestions: number;
}

export interface AiQuizGenerationResponse {
  title: string;
  questions: GeneratedAiQuestion[];
}
