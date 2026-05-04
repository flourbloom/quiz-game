import { Link } from 'react-router-dom'

function Profile() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>

      <div className="max-w-md rounded border p-6">
        <div className="text-lg font-semibold">Player one</div>
        <div className="text-sm text-gray-600">Level 3 • 12 games</div>

        <div className="mt-4">
          <div className="text-sm text-gray-600">Best score</div>
          <div className="text-2xl font-bold">520</div>
        </div>
      </div>
    </div>
  )
}

export default Profile
