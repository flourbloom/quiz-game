import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlayerList from '../components/lobby/PlayerList'
import RoomCode from '../components/lobby/RoomCode'
import DocumentUploadModal from '../components/game/DocumentUploadModal'
import GeneratedQuizEditor from '../components/game/GeneratedQuizEditor'
import { createQuiz } from '../api/quiz'
import { useRoomStore } from '../store/roomStore'
import { useGameStore } from '../store/gameStore'
import { useAuthStore } from '../store/authStore'
import { getRoomDetails } from '../api/room'
import { createStompClient } from '../api/websocket'
import type { Player } from '../types/player'
import {
  QuestionType,
  type AiQuizGenerationResponse,
  type Quiz,
  type SaveQuizRequest,
} from '../types/quiz'

const convertAiResponseToQuiz = (aiResponse: AiQuizGenerationResponse): Quiz => ({
  id: Date.now().toString(),
  title: aiResponse.title,
  description: aiResponse.description || '',
  questions: aiResponse.questions.map((question, index) => ({
    id: `q-${index}`,
    text: question.question,
    type: question.type === QuestionType.SHORT_ANSWER ? QuestionType.SHORT_ANSWER : QuestionType.MCQ,
    choices: question.type === QuestionType.MCQ
      ? [question.answer1 || '', question.answer2 || '', question.answer3 || '', question.answer4 || '']
      : undefined,
    answer: question.correctAnswer || '',
    correctChoiceIndex: question.correctChoiceIndex,
    difficulty: question.difficulty as any,
  })),
})

// Client no longer derives correct answers or indices from AI text. Backend is authoritative.

const convertQuizToGeneratedJson = (quiz: Quiz) => ({
  title: quiz.title,
  description: quiz.description,
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

const convertQuizToSaveRequest = (quiz: Quiz, creatorId: number): SaveQuizRequest => ({
  title: quiz.title,
  description: quiz.description,
  creatorId,
  questions: quiz.questions.map((question) => {
    const choices =
      question.choices && question.choices.length > 0
        ? question.choices
        : question.answer
          ? [question.answer]
          : []

      // Do not attempt to compute a correct choice index from text on the client.
      // Only forward an index if the user explicitly selected one in the editor.
      const correctAnswerField =
        typeof question.correctChoiceIndex === 'number' && question.correctChoiceIndex >= 0
          ? `answer${question.correctChoiceIndex + 1}`
          : question.answer

      return {
        questionText: question.text,
        timeLimit: null,
        // prefer the answerN form when an index is present
        correctAnswer: correctAnswerField,
        correctChoiceIndex:
          typeof question.correctChoiceIndex === 'number' && question.correctChoiceIndex >= 0
            ? question.correctChoiceIndex
            : undefined,
        choices: choices.map((choice) => ({
          choiceText: choice,
        })),
        // ensure difficulty is never null; default to MEDIUM
        difficulty: question.difficulty || 'MEDIUM',
      }
  }),
})

function Lobby() {
  const roomCode = useRoomStore((state) => state.roomId) || '----'
  const user = useAuthStore((state) => state.user)
  const [players, setPlayers] = useState<Player[]>([])
  const [error, setError] = useState('')
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [quizGeneratedMessage, setQuizGeneratedMessage] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [isSavingQuiz, setIsSavingQuiz] = useState(false)
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

  const handleSaveQuiz = async () => {
    if (!generatedQuiz) {
      setError('Generate a quiz first.')
      return
    }

    if (!user?.id) {
      setError('You must be signed in to save a quiz.')
      return
    }

    setIsSavingQuiz(true)
    setError('')
    setSaveMessage('')

    try {
      const payload = convertQuizToSaveRequest(generatedQuiz, user.id)
      const response = await createQuiz(payload)
      const savedQuiz = response.data as { id?: number; title?: string }
      setSaveMessage(
        savedQuiz?.id
          ? `✓ Quiz saved with id ${savedQuiz.id}`
          : '✓ Quiz saved successfully'
      )
    } catch (err) {
      console.error('Error saving quiz:', err)
      setError('Failed to save quiz. Please try again.')
    } finally {
      setIsSavingQuiz(false)
    }
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
          {saveMessage && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
              {saveMessage}
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
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Raw JSON Preview</h2>
                    <p className="text-sm text-slate-600">This is the quiz object you can expect Ollama to return.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveQuiz}
                    disabled={isSavingQuiz}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {isSavingQuiz ? 'Saving...' : 'Save Quiz'}
                  </button>
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
