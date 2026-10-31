import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Spinner from './components/common/Spinner'
import Toast from './components/common/Toast'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import Dashboard from './pages/Dashboard'
import Lesson from './pages/Lesson'
import NotFound from './pages/NotFound'
import useLocalStorage from './hooks/useLocalStorage'
import courses from './data/courses'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  // Shared data, saved in localStorage.
  const [enrolled, setEnrolled] = useLocalStorage('learnhub_enrolled', [])
  const [progress, setProgress] = useLocalStorage('learnhub_progress', {})

  // UI state
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  // Short loading state when the course data first loads.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Feedback message disappears after about 3 seconds.
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const showToast = (message) => setToast({ message, id: Date.now() })

  const handleEnroll = (courseId) => {
    const course = courses.find((c) => c.id === courseId)
    if (!course || enrolled.includes(courseId)) return // no duplicate enrollment
    setEnrolled((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]))
    showToast(`You are enrolled in ${course.title}.`)
  }

  const handleToggleLesson = (courseId, lessonId) => {
    const course = courses.find((c) => c.id === courseId)
    if (!course) return
    const done = progress[courseId] || []

    if (done.includes(lessonId)) {
      setProgress((prev) => ({ ...prev, [courseId]: (prev[courseId] || []).filter((id) => id !== lessonId) }))
      showToast('Lesson marked as not completed.')
      return
    }

    setProgress((prev) => {
      const current = prev[courseId] || []
      return current.includes(lessonId) ? prev : { ...prev, [courseId]: [...current, lessonId] }
    })
    showToast(done.length + 1 === course.lessons.length ? 'Course completed. Well done!' : 'Lesson marked as complete.')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails enrolled={enrolled} progress={progress} onEnroll={handleEnroll} />} />
            <Route path="/dashboard" element={<Dashboard enrolled={enrolled} progress={progress} />} />
            <Route
              path="/learn/:courseId/:lessonId"
              element={<Lesson enrolled={enrolled} progress={progress} onEnroll={handleEnroll} onToggleLesson={handleToggleLesson} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
      <Footer />
      <Toast message={toast?.message} onClose={() => setToast(null)} />
    </div>
  )
}
