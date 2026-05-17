import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlayerList from '../components/lobby/PlayerList'
import RoomCode from '../components/lobby/RoomCode'
import DocumentUploadModal from '../components/game/DocumentUploadModal'
import GeneratedQuizEditor from '../components/game/GeneratedQuizEditor'
import { useRoomStore } from '../store/roomStore'
import { useGameStore } from '../store/gameStore'
import { getRoomDetails } from '../api/room'
import { createStompClient } from '../api/websocket'
import type { Player } from '../types/player'
import { QuestionType, type AiQuizGenerationResponse, type Quiz } from '../types/quiz'

const convertAiResponseToQuiz = (aiResponse: AiQuizGenerationResponse): Quiz => ({
  id: Date.now().toString(),
  title: aiResponse.title,
  questions: aiResponse.questions.map((question, index) => ({
    id: `q-${index}`,
    text: question.question,
    type: question.type === QuestionType.SHORT_ANSWER ? QuestionType.SHORT_ANSWER : QuestionType.MCQ,
    choices: question.type === QuestionType.MCQ
      ? [question.answer1, question.answer2, question.answer3, question.answer4].filter(
          (choice): choice is string => Boolean(choice)
        )
      : undefined,
    answer: question.type === QuestionType.MCQ
      ? question.correctAnswer || ''
      : question.correctAnswer || '',
    difficulty: question.difficulty as any,
  })),
})

const convertQuizToGeneratedJson = (quiz: Quiz) => ({
  title: quiz.title,
  questions: quiz.questions.map((question) => ({
    question: question.text,
    type: question.type,
    answer1: question.choices?.[0] || '',
    answer2: question.choices?.[1] || '',
    answer3: question.choices?.[2] || '',
    answer4: question.choices?.[3] || '',
    correctAnswer: question.answer,
    difficulty: question.difficulty,
  })),
})

function Lobby() {
  const roomCode = useRoomStore((state) => state.roomId) || '----'
  const [players, setPlayers] = useState<Player[]>([])
  const [error, setError] = useState('')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [quizGeneratedMessage, setQuizGeneratedMessage] = useState('')
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null)
  const setQuiz = useGameStore((state) => state.setQuiz)

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

  const handleQuizGenerated = (aiResponse: AiQuizGenerationResponse) => {
    const quiz = convertAiResponseToQuiz(aiResponse)

    setGeneratedQuiz(quiz)
    setQuiz(quiz)
    setQuizGeneratedMessage(`✓ Quiz "${quiz.title}" generated with ${quiz.questions.length} questions`)
    
    // Clear message after 5 seconds
    setTimeout(() => setQuizGeneratedMessage(''), 5000)
  }

  const displayedPlayers = roomCode === '----' ? [] : players
  const displayedError = roomCode === '----' ? '' : error

  const handleQuizChange = (nextQuiz: Quiz) => {
    setGeneratedQuiz(nextQuiz)
    setQuiz(nextQuiz)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="mb-6 flex items-center justify-between rounded-2xl bg-white/90 px-6 py-4 shadow-sm ring-1 ring-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lobby</h1>
          <p className="text-sm text-slate-600">Generate, inspect, edit, then start the game.</p>
        </div>
        <Link className="text-blue-700 underline" to="/">
          Home
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          <RoomCode code={roomCode} />
          {displayedError && <div className="text-sm text-red-600">{displayedError}</div>}
          {quizGeneratedMessage && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              {quizGeneratedMessage}
            </div>
          )}
          <PlayerList players={displayedPlayers} />

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="rounded-xl bg-purple-600 px-4 py-3 text-white hover:bg-purple-700"
            >
              📄 Generate Quiz from Document
            </button>
            <Link className="rounded-xl bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700" to="/game">
              Start game
            </Link>
            <Link className="rounded-xl border px-4 py-3 text-center hover:bg-gray-100" to="/join">
              Invite players
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {generatedQuiz ? (
            <>
              <GeneratedQuizEditor quiz={generatedQuiz} onChange={handleQuizChange} />
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Raw JSON Preview</h2>
                    <p className="text-sm text-slate-600">This is the quiz object you can expect Ollama to return.</p>
                  </div>
                </div>
                <pre className="overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
                  {JSON.stringify(convertQuizToGeneratedJson(generatedQuiz), null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-sm text-slate-600">
              Generate a quiz from a PDF, DOCX, TXT, or PPTX file and the result will appear here for review.
            </div>
          )}
        </div>
      </div>

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onQuizGenerated={handleQuizGenerated}
      />
    </div>
  )
}

export default Lobby
