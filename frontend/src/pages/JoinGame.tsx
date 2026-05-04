import { Link } from 'react-router-dom'

function JoinGame() {
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
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Display name</span>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="Player one"
          />
        </label>

        <button className="rounded bg-green-600 px-4 py-2 text-white">
          Join room
        </button>
      </div>
    </div>
  )
}

export default JoinGame
