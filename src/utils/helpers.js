export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h}h ${m}m` : `${h}h`
}

export const getCategories = (courses) => [...new Set(courses.map((c) => c.category))]

export const isEnrolled = (enrolled, courseId) => enrolled.includes(courseId)

export const getCompletedIds = (progress, courseId) => progress[courseId] || []

export function getCourseProgress(course, progress) {
  const done = getCompletedIds(progress, course.id).filter((id) =>
    course.lessons.some((l) => l.id === id),
  )
  const total = course.lessons.length
  return {
    completed: done.length,
    total,
    remaining: total - done.length,
    percent: total ? Math.round((done.length / total) * 100) : 0,
    isComplete: total > 0 && done.length === total,
  }
}

// First lesson that is not completed (falls back to the first lesson).
export function getNextLesson(course, progress) {
  const done = getCompletedIds(progress, course.id)
  return course.lessons.find((l) => !done.includes(l.id)) || course.lessons[0]
}

export function filterCourses(courses, { search, category, level }) {
  const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return courses.filter((c) => {
    const text = [c.title, c.instructor, c.category, c.description].join(' ').toLowerCase()
    const matchesSearch = words.every((w) => text.includes(w))
    return matchesSearch && (!category || c.category === category) && (!level || c.level === level)
  })
}
