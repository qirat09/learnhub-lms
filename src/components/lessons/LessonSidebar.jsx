import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react'
import { formatMinutes } from '../../utils/helpers'

export default function LessonSidebar({ course, currentLessonId, completedIds }) {
  return (
    <nav aria-label="Course lessons" className="rounded-xl border border-stone-200 bg-white">
      <h2 className="border-b border-stone-200 px-4 py-3 font-bold text-stone-900">Course lessons</h2>
      <ol className="max-h-[28rem] divide-y divide-stone-100 overflow-y-auto">
        {course.lessons.map((lesson, i) => {
          const isCurrent = lesson.id === currentLessonId
          const isDone = completedIds.includes(lesson.id)
          return (
            <li key={lesson.id}>
              <Link
                to={`/learn/${course.id}/${lesson.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={`flex items-start gap-3 px-4 py-3 text-sm transition-colors ${
                  isCurrent ? 'bg-teal-50 text-teal-900' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-label="Completed" />
                ) : isCurrent ? (
                  <PlayCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-label="Current lesson" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-stone-300" aria-label="Not completed" />
                )}
                <span className="min-w-0 flex-1">
                  <span className={`block ${isCurrent ? 'font-bold' : 'font-medium'}`}>
                    {i + 1}. {lesson.title}
                  </span>
                  <span className="text-xs text-stone-500">{formatMinutes(lesson.duration)}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
