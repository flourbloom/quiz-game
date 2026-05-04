import React from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => (
  <div className="leaderboard">
    <h3>Leaderboard</h3>
    <ol>
      {entries.map((entry, idx) => (
        <li key={idx}>
          {entry.name}: {entry.score}
        </li>
      ))}
    </ol>
  </div>
);

export default Leaderboard;
