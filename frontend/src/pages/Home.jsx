import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Home() {
       const stats = [
    ["10M+", "Active Players"],
    ["5M+", "Quizzes Created"],
    ["180+", "Countries"],
    ["4.8★", "App Rating"],
  ];
   const features = [
    {
      title: "Real-time Multiplayer",
      desc: "Compete with friends and students live.",
    },
    {
      title: "Live Leaderboard",
      desc: "Track rankings after every question.",
    },
    {
      title: "Easy Quiz Builder",
      desc: "Create quizzes in minutes.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section id="home" className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
              New AI Quiz Generator
            </span>

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Make Learning
              <span className="text-emerald-500 block">Awesome!</span>
            </h1>

            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              Create, play, and share engaging quizzes with students and friends.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button className="bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition">
                Join Game
              </button>
              <button className="border border-emerald-500 text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition">
                Create Quiz
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80"
              alt="Students learning"
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-3xl shadow-md p-8 border">
          {stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <h3 className="text-3xl font-bold text-emerald-500">{value}</h3>
              <p className="text-gray-600 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need to host great games
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make learning interactive and fun.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 p-8 rounded-3xl border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 mb-12">Get started in three simple steps.</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["1", "Create a Quiz"],
              ["2", "Share Room Code"],
              ["3", "Play and Learn"],
            ].map(([step, title]) => (
              <div key={step} className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-xl">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
          QuizUp helps teachers and students create exciting quiz experiences and
          learn together in real time.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Ready to make learning fun?</h2>
          <p className="mb-8 text-white/90">
            Join millions of learners and teachers today.
          </p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold">
            Get Started for Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
