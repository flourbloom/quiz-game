import React from 'react';
import type { Player } from '../../types/player';

interface PlayerListProps {
  players: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
  const host = players.find((player) => player.host);
  const guests = players.filter((player) => !player.host);

  return (
    <div className="player-list">
      <div className="mb-2">
        <strong>Host:</strong>
        <div>{host ? host.nickname : '---'}</div>
      </div>

      <div>
        <strong>Players:</strong>
        {guests.length === 0 ? (
          <div className="text-sm text-gray-500">No players yet</div>
        ) : (
          <ul>
            {guests.map((player) => (
              <li key={player.id}>{player.nickname}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlayerList;
