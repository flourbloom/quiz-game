
import { Link } from "react-router-dom";

const players = [
  {
    id: 1,
    name: "Berk",
    avatar: "https://i.pravatar.cc/100?img=1",
    isYou: true,
  },
  {
    id: 2,
    name: "Beun",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "PlorkJork",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 4,
    name: "JobKok",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    id: 5,
    name: "JBarber",
    avatar: "https://i.pravatar.cc/100?img=22",
  },
  {
    id: 6,
    name: "GoodBoy",
    avatar: "https://i.pravatar.cc/100?img=30",
  },
];

export default function JoinLobby() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">
            Q
          </div>
          <span className="text-3xl font-bold text-emerald-500">QuizUp</span>
        </Link>

        <div className="bg-purple-100 text-emerald-500 px-5 py-2 rounded-full text-sm font-semibold">
          Game PIN: 123456
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">
            You're in!
          </h1>
          <p className="text-gray-500 text-2xl mb-8">
            Waiting for the host to start the game...
          </p>

          {/* Players Card */}
          <div className="bg-white rounded-2xl shadow-md border p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Players</h2>
              <span className="bg-emerald-100 text-emerald-500 px-3 py-1 rounded-full text-sm font-semibold">
                {players.length} joined
              </span>
            </div>

            {/* Player List */}
            <div className="space-y-4">
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between px-4 py-4 rounded-xl border ${
                    player.isYou
                      ? "bg-purple-50 border-purple-200"
                      : "bg-gray-50 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {player.name}
                    </span>
                  </div>

                  {player.isYou && (
                    <span className="bg-emerald-500 text-white text-sm px-4 py-1 rounded-full font-medium">
                      You
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tip Box */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-4 text-yellow-700 text-sm">
            💡 Tip: Get ready! The game is about to begin.
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center">
          {/* Status Card */}
          <div className="bg-purple-50 rounded-2xl overflow-hidden shadow-sm border w-full max-w-xs">
            <div className="bg-gradient-to-b from-purple-300 to-purple-600 h-64 flex items-center justify-center">
              <div className="text-white text-7xl">🪑</div>
            </div>

            <div className="p-6 text-center">
              <h3 className="text-emerald-500 font-bold text-xl mb-2">
                Getting Ready
              </h3>
              <p className="text-gray-500 text-sm">
                Players are joining the lobby
              </p>
            </div>
          </div>

          {/* Joining Button */}
          <button className="mt-10 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-12 py-3 rounded-full shadow-sm transition">
            Joining
          </button>
        </div>
      </div>

      {/* Floating Status */}
      <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-full px-6 py-4 text-gray-500 text-sm border">
        Waiting for host...
      </div>
    </div>
  );
}