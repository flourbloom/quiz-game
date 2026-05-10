import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { joinRoom } from '../api/room';
import { useRoomStore } from '../store/roomStore';

function JoinGame() {
  const [roomCode, setRoomCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setRoomId = useRoomStore((state) => state.setRoomId);

  const handleJoin = async () => {
    setError('');
    if (!roomCode || !nickname) {
      setError('Please enter both room code and nickname.');
      return;
    }
    setLoading(true);
    try {
      await joinRoom({ roomCode, nickname });
      setRoomId(roomCode);
      navigate('/lobby'); // or navigate(`/game/${roomCode}`) depending on your app
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        // @ts-expect-error: response is not typed
        setError(err.response?.data?.message || 'Failed to join room.');
      } else {
        setError('Failed to join room.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Join Game</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>

      <div className="max-w-md space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600">Room code</span>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="ABCD12"
            value={roomCode}
            onChange={e => setRoomCode(e.target.value)}
            disabled={loading}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Nickname</span>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="Player one"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            disabled={loading}
          />
        </label>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
          onClick={handleJoin}
          disabled={loading}
        >
          {loading ? 'Joining...' : 'Join room'}
        </button>
      </div>
    </div>
  );
}

export default JoinGame
