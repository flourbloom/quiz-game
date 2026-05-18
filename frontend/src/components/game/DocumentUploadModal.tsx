import { useState } from 'react'
import { generateQuizFromDocument } from '../../api/quiz'
import { DifficultyLevel, QuestionType, type AiQuizGenerationResponse } from '../../types/quiz'
import Modal from '../common/Modal'
import Loader from '../common/Loader'

interface DocumentUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onQuizGenerated: (quiz: AiQuizGenerationResponse) => void
}

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

export default function DocumentUploadModal({
  isOpen,
  onClose,
  onQuizGenerated,
}: DocumentUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(DifficultyLevel.MEDIUM)
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.MCQ)
  const [numberOfQuestions, setNumberOfQuestions] = useState(10)
  const [model, setModel] = useState('llama3.2:latest')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
      const validExtensions = ['.pdf', '.docx', '.txt', '.pptx']
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase()

      if (!validTypes.includes(selectedFile.type) && !validExtensions.includes(fileExtension)) {
        setError('Please upload a PDF, DOCX, TXT, or PPTX file.')
        setFile(null)
        return
      }

      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('File size must be less than 100MB.')
        setFile(null)
        return
      }

      setFile(selectedFile)
      setError('')
    }
  }

  const handleGenerate = async () => {
    if (!file) {
      setError('Please select a file.')
      return
    }

    if (numberOfQuestions < 1 || numberOfQuestions > 50) {
      setError('Number of questions must be between 1 and 50.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await generateQuizFromDocument(
        file,
        difficulty,
        questionType,
        numberOfQuestions,
        model
      )

      if (response?.data) {
        onQuizGenerated(response.data)
        handleClose()
      } else {
        setError('Failed to generate quiz. Please try again.')
      }
    } catch (err) {
      console.error('Error generating quiz:', err)
      const apiError = err as ApiError
      setError(
        err && typeof err === 'object' && 'response' in err
          ? apiError.response?.data?.message || 'Failed to generate quiz.'
          : 'Failed to generate quiz. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setDifficulty(DifficultyLevel.MEDIUM)
    setQuestionType(QuestionType.MCQ)
    setNumberOfQuestions(10)
    setModel('llama3.2:latest')
    setError('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-full max-w-md space-y-4 p-6">
        <h2 className="text-2xl font-bold">Generate Quiz from Document</h2>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Document
            <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".pdf,.docx,.txt,.pptx"
            onChange={handleFileChange}
            disabled={loading}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
          />
          {file && (
            <p className="mt-1 text-sm text-green-600">
              ✓ {file.name} selected
            </p>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            disabled={loading}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
          >
            <option value={DifficultyLevel.EASY}>Easy</option>
            <option value={DifficultyLevel.MEDIUM}>Medium</option>
            <option value={DifficultyLevel.HARD}>Hard</option>
          </select>
        </div>

        {/* Question Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Question Type
          </label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            disabled={loading}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
          >
            <option value={QuestionType.MCQ}>Multiple Choice (MCQ)</option>
            <option value={QuestionType.SHORT_ANSWER}>Short Answer</option>
            <option value="COMBINATION">Combination (Mix of both)</option>
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ollama Model
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={loading}
            placeholder="llama3.2:latest"
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
          />
          <p className="mt-1 text-xs text-gray-500">
            Use any model name from <span className="font-medium">ollama list</span>, such as <span className="font-medium">llama3.2:latest</span> or <span className="font-medium">llama2:latest</span>.
          </p>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Questions
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
            disabled={loading}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
          />
        </div>

        {/* Error Message */}
        {error && <div className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</div>}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 rounded bg-gray-300 px-4 py-2 text-white disabled:opacity-50 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || !file}
            className="flex-1 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50 hover:bg-blue-700"
          >
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-4">
            <Loader />
            <span className="ml-2 text-sm text-gray-600">Generating quiz from document...</span>
          </div>
        )}
      </div>
    </Modal>
  )
}
