import { Link } from 'react-router-dom'
import { Clock, BookOpen, User, CheckCircle2 } from 'lucide-react'
import SafeImage from '../common/SafeImage'
import Badge from '../common/Badge'
import Button from '../common/Button'
import ProgressBar from '../common/ProgressBar'

// Listing version by default. Pass `progressInfo` + `lessonPath` for the dashboard version.
export default function CourseCard({ course, progressInfo, lessonPath }) {
  const detailsPath = `/courses/${course.id}`

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-md">
      <Link to={detailsPath} tabIndex={-1} aria-hidden="true">
        <SafeImage src={course.thumbnail} alt="" className="aspect-video w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>{course.category}</Badge>
          <Badge variant={course.level}>{course.level}</Badge>
        </div>
        <h3 className="text-lg font-bold leading-snug text-stone-900">
          <Link to={detailsPath} className="hover:text-teal-700">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-stone-600">
          <User className="h-4 w-4" aria-hidden="true" />
          {course.instructor}
        </p>
        <div className="mt-2 flex items-center gap-4 text-sm text-stone-500">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {course.lessons.length} lessons
          </span>
        </div>

        {progressInfo ? (
          <div className="mt-4 flex flex-1 flex-col justify-end gap-3">
            <ProgressBar percent={progressInfo.percent} label={`${course.title} progress`} />
            <p className="text-sm text-stone-600">
              {progressInfo.completed} of {progressInfo.total} lessons completed
              {!progressInfo.isComplete && <span> &middot; {progressInfo.remaining} lessons remaining</span>}
            </p>
            {progressInfo.isComplete && (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Completed
              </span>
            )}
            <Button to={lessonPath} variant={progressInfo.isComplete ? 'outline' : 'primary'}>
              {progressInfo.isComplete ? 'Review Course' : 'Continue Learning'}
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-1 items-end">
            <Button to={detailsPath} variant="outline" className="w-full">
              View Course
            </Button>
          </div>
        )}
      </div>
    </article>
  )
}
