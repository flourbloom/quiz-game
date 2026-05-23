import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import HostPage from '../pages/HostPage'
import PlayerPage from '../pages/PlayerPage'
import CreateQuiz from '../pages/CreateQuiz'
import CreateRoom from '../pages/CreateRoom'
import JoinGame from '../pages/JoinGame'
import Lobby from '../pages/Lobby'
import GameRoom from '../pages/GameRoom'
import Results from '../pages/Results'
import Profile from '../pages/Profile'
import Auth from '../pages/Auth'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/host" element={<HostPage />} />
    <Route path="/player" element={<PlayerPage />} />
    <Route path="/create" element={<CreateQuiz />} />
    <Route path="/create-room" element={<CreateRoom />} />
    <Route path="/join" element={<JoinGame />} />
    <Route path="/lobby" element={<Lobby />} />
    <Route path="/game" element={<GameRoom />} />
    <Route path="/results" element={<Results />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/auth" element={<Auth />} />
  </Routes>
)

export default AppRoutes
