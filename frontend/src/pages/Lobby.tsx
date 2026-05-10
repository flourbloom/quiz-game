import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlayerList from '../components/lobby/PlayerList'
import RoomCode from '../components/lobby/RoomCode'
import { useRoomStore } from '../store/roomStore'
import { getRoomDetails } from '../api/room'
import { createStompClient } from '../api/websocket'
import type { Player } from '../types/player'

function Lobby() {
  const roomCode = useRoomStore((state) => state.roomId) || '----'
  const [players, setPlayers] = useState<Player[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (roomCode === '----') {
      return
    }

    let isMounted = true
    const client = createStompClient()

    const applyPlayers = (playersList: Player[]) => {
      if (isMounted) {
        setPlayers(playersList)
      }
    }

    const fetchInitialPlayers = async () => {
      try {
        const res = await getRoomDetails(roomCode)
        applyPlayers((res?.data?.players || []) as Player[])
        if (isMounted) {
          setError('')
        }
      } catch {
        if (isMounted) {
          setError('Unable to load players.')
        }
      }
    }

    fetchInitialPlayers()

    client.onConnect = () => {
      client.subscribe(`/topic/room/${roomCode}`, (message) => {
        try {
          const event = JSON.parse(message.body) as {
            type?: string
            data?: { players?: Player[] }
          }
          if (event.type === 'PLAYER_JOINED' && event.data?.players) {
            applyPlayers(event.data.players)
            if (isMounted) {
              setError('')
            }
          }
        } catch {
          if (isMounted) {
            setError('Unable to read live updates.')
          }
        }
      })
    }

    client.onStompError = () => {
      if (isMounted) {
        setError('WebSocket connection error.')
      }
    }

    client.activate()

    return () => {
      isMounted = false
      client.deactivate()
    }
  }, [roomCode])

  const displayedPlayers = roomCode === '----' ? [] : players
  const displayedError = roomCode === '----' ? '' : error

  return (
    <div className="min-h-screen p-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lobby</h1>
        <Link className="text-blue-600 underline" to="/">
          Home
        </Link>
      </header>

      <div className="max-w-md space-y-6">
        <RoomCode code={roomCode} />
        {displayedError && <div className="text-sm text-red-600">{displayedError}</div>}
        <PlayerList players={displayedPlayers} />

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
