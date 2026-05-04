import { Link } from 'react-router-dom'
import PlayerList from '../components/lobby/PlayerList'
import RoomCode from '../components/lobby/RoomCode'

const players = ['Ava', 'Sam', 'Nia', 'Leo']

function Lobby() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lobby</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>

      <div className="max-w-md space-y-6">
        <RoomCode code="QZ-4821" />
        <PlayerList players={players} />

        <div className="flex gap-3">
          <Link className="rounded bg-blue-600 px-4 py-2 text-white" to="/game">
            Start game
          </Link>
          <Link className="rounded border px-4 py-2" to="/join">
            Invite players
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Lobby
