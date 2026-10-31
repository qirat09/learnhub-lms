import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, FileText, List, Lock, SearchX, BookOpen } from 'lucide-react'
import VideoPlayer from '../components/lessons/VideoPlayer'
import LessonSidebar from '../components/lessons/LessonSidebar'
import ProgressBar from '../components/common/ProgressBar'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import courses from '../data/courses'
import { formatMinutes, getCompletedIds, getCourseProgress, isEnrolled } from '../utils/helpers'

export default function Lesson({ enrolled, progress, onEnroll, onToggleLesson }) {
  const { courseId, lessonId } = useParams()
  const [showList, setShowList] = useState(false)

  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState icon={SearchX} title="Course not found" message="We could not find the course for this lesson.">
          <Button to="/courses">Back to Courses</Button>
        </EmptyState>
      </div>
    )
  }

  const index = course.lessons.findIndex((l) => l.id === lessonId)
  const lesson = course.lessons[index]

  if (!lesson) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState icon={SearchX} title="Lesson not found" message="This lesson does not exist in the course.">
          <Button to={`/courses/${course.id}`}>View Course</Button>
        </EmptyState>
      </div>
    )
  }

  if (!isEnrolled(enrolled, course.id)) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState icon={Lock} title="Enroll to watch this lesson" message={`You need to enroll in ${course.title} before you can open its lessons.`}>
          <Button onClick={() => onEnroll(course.id)}>Enroll Now</Button>
          <Button to={`/courses/${course.id}`} variant="outline">View Course</Button>
        </EmptyState>
      </div>
    )
  }

  const completedIds = getCompletedIds(progress, course.id)
  const isDone = completedIds.includes(lesson.id)
  const info = getCourseProgress(course, progress)
  const prev = course.lessons[index - 1]
  const next = course.lessons[index + 1]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to={`/courses/${course.id}`} className="text-sm font-semibold text-teal-700 hover:underline">
        {course.title}
      </Link>
      <h1 className="mt-1 text-2xl font-extrabold text-stone-900 sm:text-3xl">{lesson.title}</h1>
      <p className="mt-1 text-sm text-stone-600">
        Lesson {index + 1} of {course.lessons.length} &middot; {formatMinutes(lesson.duration)}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VideoPlayer key={lesson.id} src={lesson.videoUrl} title={lesson.title} />
        </div>

        <aside className="space-y-4 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <ProgressBar percent={info.percent} />
            <p className="mt-2 text-sm text-stone-600">{info.completed} of {info.total} lessons completed</p>
          </div>
          <button
            type="button"
            onClick={() => setShowList((open) => !open)}
            aria-expanded={showList}
            aria-controls="lesson-list"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-100 lg:hidden"
          >
            <List className="h-4 w-4" aria-hidden="true" />
            {showList ? 'Hide lesson list' : 'Show lesson list'}
          </button>
          <div id="lesson-list" className={`lg:block ${showList ? 'block' : 'hidden'}`}>
            <LessonSidebar course={course} currentLessonId={lesson.id} completedIds={completedIds} />
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-2">
          <section aria-labelledby="about-heading" className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <h2 id="about-heading" className="text-xl font-bold text-stone-900">About this lesson</h2>
            <p className="mt-2 leading-relaxed text-stone-600">{lesson.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to={prev && `/learn/${course.id}/${prev.id}`} disabled={!prev} variant="outline">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous Lesson
              </Button>
              <Button to={next && `/learn/${course.id}/${next.id}`} disabled={!next} variant="outline">
                Next Lesson
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button onClick={() => onToggleLesson(course.id, lesson.id)} variant={isDone ? 'success' : 'primary'} aria-pressed={isDone} className="sm:ml-auto">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {isDone ? 'Completed (undo)' : 'Mark as Complete'}
              </Button>
            </div>
          </section>

          <section aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-xl font-bold text-stone-900">Learning resources</h2>
            <ul className="mt-3 space-y-3">
              {lesson.resources.map((r) => (
                <li key={r.title}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-teal-700"
                  >
                    {r.type === 'Documentation' ? (
                      <BookOpen className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                    ) : (
                      <FileText className="h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-stone-900">{r.title}</span>
                      <span className="text-sm text-stone-500">{r.type}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-stone-400" aria-label="Opens in a new tab" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
