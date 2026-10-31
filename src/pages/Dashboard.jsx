import { BookOpen, CheckCircle2, Trophy } from 'lucide-react'
import CourseCard from '../components/courses/CourseCard'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/common/Button'
import courses from '../data/courses'
import { getCourseProgress, getNextLesson } from '../utils/helpers'

export default function Dashboard({ enrolled, progress }) {
  // Ignore ids in saved data that no longer match a course.
  const myCourses = enrolled.map((id) => courses.find((c) => c.id === id)).filter(Boolean)
  const infos = myCourses.map((c) => getCourseProgress(c, progress))
  const lessonsDone = infos.reduce((sum, i) => sum + i.completed, 0)
  const coursesDone = infos.filter((i) => i.isComplete).length

  const stats = [
    { label: 'Courses enrolled', value: myCourses.length, icon: BookOpen },
    { label: 'Lessons completed', value: lessonsDone, icon: CheckCircle2 },
    { label: 'Courses completed', value: coursesDone, icon: Trophy },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-stone-900">My Learning</h1>
      <p className="mt-2 text-stone-600">Pick up where you left off.</p>

      {myCourses.length === 0 ? (
        <div className="mt-10">
          <EmptyState icon={BookOpen} title="You have not enrolled in any course yet" message="Find a course you like and enroll to see your progress here.">
            <Button to="/courses">Browse Courses</Button>
          </EmptyState>
        </div>
      ) : (
        <>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dd className="text-2xl font-extrabold text-stone-900">{value}</dd>
                  <dt className="text-sm text-stone-600">{label}</dt>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course, i) => (
              <CourseCard
                key={course.id}
                course={course}
                progressInfo={infos[i]}
                lessonPath={`/learn/${course.id}/${getNextLesson(course, progress).id}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
