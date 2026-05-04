import React from 'react';

interface QuestionCardProps {
  question: string;
  choices: string[];
  onSelect: (choice: string) => void;
  selected?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, choices, onSelect, selected }) => (
  <div className="question-card">
    <h3>{question}</h3>
    <ul>
      {choices.map((choice) => (
        <li key={choice}>
          <button
            className={selected === choice ? 'selected' : ''}
            onClick={() => onSelect(choice)}
          >
            {choice}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default QuestionCard;
