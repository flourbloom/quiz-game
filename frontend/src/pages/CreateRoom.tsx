import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createRoom } from '../api/room';
import { useRoomStore } from '../store/roomStore';

function CreateRoom() {
  const [hostName, setHostName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setRoomId = useRoomStore((state) => state.setRoomId);

  const handleCreate = async () => {
    setError('');
    setRoomId(null);
    if (!hostName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setLoading(true);
    try {
      const res = await createRoom({ hostName: hostName.trim() });
      const nextRoomCode = res?.data?.roomCode as string | undefined;
      if (!nextRoomCode) {
        setError('Room created but no room code was returned.');
        return;
      }
      setRoomId(nextRoomCode);
      navigate('/lobby');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        // @ts-expect-error: response is not typed
        setError(err.response?.data?.message || 'Failed to create room.');
      } else {
        setError('Failed to create room.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Room</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>
      <div className="max-w-md space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600">Host name</span>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="Host name"
            value={hostName}
            onChange={e => setHostName(e.target.value)}
            disabled={loading}
          />
        </label>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create room'}
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;
