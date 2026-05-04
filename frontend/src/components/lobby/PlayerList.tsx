import React from 'react';

interface PlayerListProps {
  players: string[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => (
  <div className="player-list">
    <h4>Players</h4>
    <ul>
      {players.map((player) => (
        <li key={player}>{player}</li>
      ))}
    </ul>
  </div>
);

export default PlayerList;
