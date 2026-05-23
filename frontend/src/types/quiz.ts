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
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices?: string[];
  answer: string;
  correctChoiceIndex?: number;
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
  correctChoiceIndex?: number;
  difficulty?: DifficultyLevel | string;
}

export interface AiQuizGenerationRequest {
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  numberOfQuestions: number;
  model?: string;
}

export interface AiQuizGenerationResponse {
  title: string;
  description: string;
  questions: GeneratedAiQuestion[];
}

export interface SaveQuizChoiceRequest {
  choiceText: string;
}

export interface SaveQuizQuestionRequest {
  questionText: string;
  timeLimit?: number | null;
  correctAnswer?: string;
  correctChoiceIndex?: number;
  choices: SaveQuizChoiceRequest[];
}

export interface SaveQuizRequest {
  title: string;
  description: string;
  creatorId: number;
  questions: SaveQuizQuestionRequest[];
}
