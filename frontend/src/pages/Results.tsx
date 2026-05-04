import { Link } from 'react-router-dom'
import Leaderboard from '../components/game/Leaderboard'

const results = [
  { name: 'Ava', score: 420 },
  { name: 'Sam', score: 380 },
  { name: 'Nia', score: 360 },
  { name: 'Leo', score: 330 },
]

function Results() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Results</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>

      <div className="max-w-md space-y-6">
        <Leaderboard entries={results} />
        <Link className="rounded bg-blue-600 px-4 py-2 text-white" to="/lobby">
          Play again
        </Link>
      </div>
    </div>
  )
}

export default Results
