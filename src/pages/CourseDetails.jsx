import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, CheckCircle2, Clock, SearchX, User, BarChart3 } from 'lucide-react'
import SafeImage from '../components/common/SafeImage'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import ProgressBar from '../components/common/ProgressBar'
import EmptyState from '../components/common/EmptyState'
import courses from '../data/courses'
import { formatMinutes, getCourseProgress, getNextLesson, isEnrolled } from '../utils/helpers'

export default function CourseDetails({ enrolled, progress, onEnroll }) {
  const { courseId } = useParams()
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState icon={SearchX} title="Course not found" message="This course does not exist or may have been removed.">
          <Button to="/courses">Back to Courses</Button>
        </EmptyState>
      </div>
    )
  }

  const enrolledInCourse = isEnrolled(enrolled, course.id)
  const info = getCourseProgress(course, progress)
  const nextLesson = getNextLesson(course, progress)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Courses
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SafeImage src={course.thumbnail} alt={`Thumbnail for ${course.title}`} className="aspect-video w-full rounded-xl" />
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{course.category}</Badge>
            <Badge variant={course.level}>{course.level}</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-stone-900 sm:text-4xl">{course.title}</h1>
          <p className="mt-4 leading-relaxed text-stone-600">{course.description}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
            <li className="flex items-center gap-2"><User className="h-4 w-4" aria-hidden="true" />{course.instructor}</li>
            <li className="flex items-center gap-2"><BarChart3 className="h-4 w-4" aria-hidden="true" />{course.level}</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden="true" />{course.duration}</li>
            <li className="flex items-center gap-2"><BookOpen className="h-4 w-4" aria-hidden="true" />{course.lessons.length} lessons</li>
          </ul>
        </div>

        <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6 lg:sticky lg:top-24" aria-label="Enrollment">
          {enrolledInCourse ? (
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Enrolled
              </span>
              <ProgressBar percent={info.percent} />
              <p className="text-sm text-stone-600">{info.completed} of {info.total} lessons completed</p>
              <Button to={`/learn/${course.id}/${nextLesson.id}`} className="w-full">
                {info.completed === 0 ? 'Start Lessons' : info.isComplete ? 'Review Lessons' : 'Continue Lessons'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-bold text-stone-900">Free course</p>
              <p className="text-sm text-stone-600">Enroll to unlock the lessons and track your progress on this device.</p>
              <Button onClick={() => onEnroll(course.id)} className="w-full">
                Enroll Now
              </Button>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section aria-labelledby="outcomes-heading">
            <h2 id="outcomes-heading" className="text-2xl font-extrabold text-stone-900">What you will learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 rounded-lg bg-white p-4 text-sm text-stone-700 ring-1 ring-stone-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="curriculum-heading">
            <h2 id="curriculum-heading" className="text-2xl font-extrabold text-stone-900">Curriculum</h2>
            <ol className="mt-4 divide-y divide-stone-100 rounded-xl border border-stone-200 bg-white">
              {course.lessons.map((lesson, i) => (
                <li key={lesson.id} className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-bold text-stone-700">{i + 1}</span>
                    <span className="font-medium text-stone-800">{lesson.title}</span>
                  </span>
                  <span className="shrink-0 text-sm text-stone-500">{formatMinutes(lesson.duration)}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}
