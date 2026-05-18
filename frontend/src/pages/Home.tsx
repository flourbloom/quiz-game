import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-5xl font-bold text-blue-600">Quiz Game</h1>

      <p className="text-gray-600">Kahoot-style OOP Quiz Platform</p>

      <div className="mt-6 grid gap-3 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link className="rounded bg-blue-600 px-4 py-2 text-white" to="/create-room">
            Create room
          </Link>
          <Link className="rounded bg-blue-500 px-4 py-2 text-white" to="/create">
            Create quiz
          </Link>
          <Link className="rounded bg-green-600 px-4 py-2 text-white" to="/join">
            Join game
          </Link>
          <Link className="rounded border px-4 py-2" to="/lobby">
            Lobby
          </Link>
          <Link className="rounded border px-4 py-2" to="/game">
            Game room
          </Link>
          <Link className="rounded border px-4 py-2" to="/results">
            Results
          </Link>
          <Link className="rounded border px-4 py-2" to="/profile">
            Profile
          </Link>
          <Link className="rounded border px-4 py-2" to="/auth">
            Auth
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link className="rounded border px-4 py-2" to="/host">
            Host dashboard
          </Link>
          <Link className="rounded border px-4 py-2" to="/player">
            Player room
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage