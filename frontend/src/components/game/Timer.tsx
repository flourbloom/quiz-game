import React from 'react';

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => (
  <div className="timer">
    Time left: {time}s
  </div>
);

export default Timer;
