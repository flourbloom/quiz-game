import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnswerGrid from '../components/game/AnswerGrid'
import Timer from '../components/game/Timer'

const choices = ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction']

function GameRoom() {
  const [selected, setSelected] = useState<string | undefined>()

  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Game Room</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>

      <div className="max-w-2xl space-y-5">
        <p className="text-xl font-semibold">
          Which OOP principle hides internal state and exposes only methods?
        </p>
        <Timer time={18} />
        <AnswerGrid answers={choices} onSelect={setSelected} selected={selected} />

        <div className="flex gap-3">
          <Link className="rounded bg-blue-600 px-4 py-2 text-white" to="/results">
            Submit
          </Link>
          <Link className="rounded border px-4 py-2" to="/lobby">
            Back to lobby
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GameRoom
