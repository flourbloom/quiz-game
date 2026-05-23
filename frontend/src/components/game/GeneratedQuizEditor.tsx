import { useState } from 'react'
import {
  DifficultyLevel,
  QuestionType,
  type Quiz,
  type Question,
} from '../../types/quiz'

interface GeneratedQuizEditorProps {
  quiz: Quiz
  onChange: (quiz: Quiz) => void
}

  type EditableQuestion = Question

  const createEmptyQuestion = (source?: Partial<Question>): EditableQuestion => ({
    id: source?.id ?? Date.now().toString(),
    text: source?.text ?? '',
    type: source?.type ?? QuestionType.MCQ,
    choices: source?.choices ?? ['', '', '', ''],
    answer: source?.answer ?? '',
    correctChoiceIndex: source?.correctChoiceIndex,
    difficulty: source?.difficulty ?? DifficultyLevel.MEDIUM,
  })

  export default function GeneratedQuizEditor({ quiz, onChange }: GeneratedQuizEditorProps) {
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)
    const [draftQuestion, setDraftQuestion] = useState<EditableQuestion | null>(null)

    const openEditor = (question: Question) => {
      setEditingQuestionId(question.id)
      setDraftQuestion(createEmptyQuestion(question))
    }

    const closeEditor = () => {
      setEditingQuestionId(null)
      setDraftQuestion(null)
    }

    const updateQuestion = (questionId: string, updatedQuestion: Question) => {
      onChange({
        ...quiz,
        questions: quiz.questions.map((question) =>
          question.id === questionId ? updatedQuestion : question
        ),
      })
    }

    const deleteQuestion = (questionId: string) => {
      const nextQuestions = quiz.questions.filter((question) => question.id !== questionId)

      onChange({
        ...quiz,
        questions: nextQuestions,
      })

      if (editingQuestionId === questionId) {
        closeEditor()
      }
    }

    const handleSave = () => {
      if (!draftQuestion || !editingQuestionId) {
        return
      }

      const normalizedChoices = (draftQuestion.choices || [])
        .map((choice) => choice.trim())
        .filter(Boolean)

      const updatedQuestion: Question = {
        ...draftQuestion,
        text: draftQuestion.text.trim(),
        // Keep the existing `answer` value; do not derive it from the selected index on the client.
        answer: draftQuestion.answer.trim(),
        choices: draftQuestion.type === QuestionType.MCQ ? normalizedChoices : undefined,
        correctChoiceIndex:
          draftQuestion.type === QuestionType.MCQ ? draftQuestion.correctChoiceIndex : undefined,
      }

      updateQuestion(editingQuestionId, updatedQuestion)
      closeEditor()
    }

    const updateQuizField = (field: 'title' | 'description', value: string) => {
      onChange({
        ...quiz,
        [field]: value,
      })
    }

    const updateDraft = (field: keyof EditableQuestion, value: string) => {
      if (!draftQuestion) {
        return
      }

      setDraftQuestion({
        ...draftQuestion,
        [field]: value,
      })
    }

    const updateChoice = (index: number, value: string) => {
      if (!draftQuestion) {
        return
      }

      const nextChoices = [...(draftQuestion.choices || ['', '', '', ''])]
      nextChoices[index] = value

      setDraftQuestion({
        ...draftQuestion,
        choices: nextChoices,
      })
    }

    const updateCorrectChoiceIndex = (value: string) => {
      if (!draftQuestion) {
        return
      }

      const parsedIndex = value === '' ? undefined : Number.parseInt(value, 10)
      const nextIndex = typeof parsedIndex === 'number' && !Number.isNaN(parsedIndex) ? parsedIndex : undefined

      setDraftQuestion({
        ...draftQuestion,
        // Only record the selected index; do not overwrite the `answer` text.
        correctChoiceIndex: nextIndex,
      })
    }

    const editingQuestionExists = quiz.questions.some((question) => question.id === editingQuestionId)
    const shouldShowEditor = draftQuestion && editingQuestionId && editingQuestionExists

    return (
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Generated Quiz Preview</h2>
            <p className="text-sm text-slate-600">Edit or delete questions before you start the game.</p>
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {quiz.questions.length} questions
          </div>
        </div>

        <div className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <label className="grid gap-1 text-sm text-slate-700">
            Title
            <input
              value={quiz.title}
              onChange={(e) => updateQuizField('title', e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <label className="grid gap-1 text-sm text-slate-700">
            Description
            <textarea
              value={quiz.description}
              onChange={(e) => updateQuizField('description', e.target.value)}
              rows={3}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        </div>

        <div className="space-y-3">
          {quiz.questions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
              No questions remain. Generate a new quiz or add questions again.
            </div>
          ) : (
            quiz.questions.map((question, index) => {
              const selectedChoiceText =
                typeof question.correctChoiceIndex === 'number'
                  ? question.choices?.[question.correctChoiceIndex] || ''
                  : question.answer

              return (
                <div key={question.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                        <span>Q{index + 1}</span>
                        <span>•</span>
                        <span>{question.type}</span>
                        <span>•</span>
                        <span>{question.difficulty}</span>
                      </div>

                      <p className="text-sm font-medium text-slate-900">{question.text}</p>

                      {question.choices?.length ? (
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {question.choices.map((choice, choiceIndex) => (
                            <li
                              key={`${question.id}-${choiceIndex}`}
                              className={`rounded-lg bg-white px-3 py-2 text-sm shadow-sm ring-1 ${
                                choiceIndex === question.correctChoiceIndex
                                  ? 'ring-emerald-300 text-emerald-800'
                                  : 'ring-slate-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + choiceIndex)}. {choice}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-600">Answer: {selectedChoiceText || question.answer}</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditor(question)}
                        className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteQuestion(question.id)}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {shouldShowEditor && draftQuestion && (
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Edit Question</h3>

            <div className="grid gap-3">
              <label className="grid gap-1 text-sm text-slate-700">
                Question
                <textarea
                  value={draftQuestion.text}
                  onChange={(e) => updateDraft('text', e.target.value)}
                  rows={3}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </label>

              <label className="grid gap-1 text-sm text-slate-700">
                Type
                <select
                  value={draftQuestion.type}
                  onChange={(e) => updateDraft('type', e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value={QuestionType.MCQ}>MCQ</option>
                  <option value={QuestionType.SHORT_ANSWER}>SHORT_ANSWER</option>
                </select>
              </label>

              {draftQuestion.type === QuestionType.MCQ ? (
                <div className="grid gap-3">
                  {['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'].map((label, choiceIndex) => (
                    <label key={label} className="grid gap-1 text-sm text-slate-700">
                      {label}
                      <input
                        value={draftQuestion.choices?.[choiceIndex] || ''}
                        onChange={(e) => updateChoice(choiceIndex, e.target.value)}
                        className="rounded-lg border border-slate-300 px-3 py-2"
                      />
                    </label>
                  ))}

                  <label className="grid gap-1 text-sm text-slate-700">
                    Correct Option
                    <select
                      value={typeof draftQuestion.correctChoiceIndex === 'number' ? draftQuestion.correctChoiceIndex : ''}
                      onChange={(e) => updateCorrectChoiceIndex(e.target.value)}
                      className="rounded-lg border border-slate-300 px-3 py-2"
                    >
                      <option value="">Select the correct option</option>
                      {(draftQuestion.choices || []).map((choice, choiceIndex) => (
                        <option key={`${choiceIndex}-${choice}`} value={choiceIndex}>
                          {String.fromCharCode(65 + choiceIndex)}: {choice || `Choice ${choiceIndex + 1}`}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : (
                <label className="grid gap-1 text-sm text-slate-700">
                  Answer
                  <input
                    value={draftQuestion.answer}
                    onChange={(e) => updateDraft('answer', e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2"
                  />
                </label>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={closeEditor}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }