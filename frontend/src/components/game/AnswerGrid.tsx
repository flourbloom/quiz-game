import React from 'react';

interface AnswerGridProps {
  answers: string[];
  onSelect: (answer: string) => void;
  selected?: string;
}

const AnswerGrid: React.FC<AnswerGridProps> = ({ answers, onSelect, selected }) => (
  <div className="answer-grid">
    {answers.map((answer) => (
      <button
        key={answer}
        className={selected === answer ? 'selected' : ''}
        onClick={() => onSelect(answer)}
      >
        {answer}
      </button>
    ))}
  </div>
);

export default AnswerGrid;
