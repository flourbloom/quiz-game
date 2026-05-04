import { Link } from 'react-router-dom'

function CreateQuiz() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Quiz</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>

      <div className="max-w-xl space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600">Quiz title</span>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="Intro to OOP"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">First question</span>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="What is encapsulation?"
            rows={3}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <input className="rounded border px-3 py-2" placeholder="Choice A" />
          <input className="rounded border px-3 py-2" placeholder="Choice B" />
          <input className="rounded border px-3 py-2" placeholder="Choice C" />
          <input className="rounded border px-3 py-2" placeholder="Choice D" />
        </div>

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Save draft
        </button>
      </div>
    </div>
  )
}

export default CreateQuiz
