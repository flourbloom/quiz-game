import React from 'react';

interface RoomCodeProps {
  code: string;
}

const RoomCode: React.FC<RoomCodeProps> = ({ code }) => (
  <div className="room-code">
    <span>Room Code: <strong>{code}</strong></span>
  </div>
);

export default RoomCode;
