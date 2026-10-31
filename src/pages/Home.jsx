import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/courses/SearchBar'
import CourseCard from '../components/courses/CourseCard'
import CategoryCard from '../components/courses/CategoryCard'
import InstructorCard from '../components/courses/InstructorCard'
import courses from '../data/courses'
import instructors from '../data/instructors'
import { getCategories } from '../utils/helpers'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const featured = courses.filter((c) => c.featured).slice(0, 4)
  const categories = getCategories(courses)
  const lessonCount = courses.reduce((sum, c) => sum + c.lessons.length, 0)

  // An empty search opens the Courses page with every course.
  const handleSearch = (text) => {
    const q = text.trim()
    navigate(q ? `/courses?search=${encodeURIComponent(q)}` : '/courses')
  }

  return (
    <>
      <section className="bg-teal-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="max-w-3xl text-4xl leading-tight font-extrabold sm:text-5xl">Learn new skills at your own pace</h1>
          <p className="mt-5 max-w-2xl text-lg text-teal-100">
            Pick a course, watch short lessons and see your progress grow. Everything is free, and your progress stays on this device.
          </p>
          <div className="mt-8 max-w-2xl">
            <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
          </div>
          <p className="mt-4 text-sm text-teal-200">
            {courses.length} free courses with {lessonCount} lessons to start with.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="featured-heading" className="text-2xl font-extrabold text-stone-900">
            Featured courses
          </h2>
          <Link to="/courses" className="text-sm font-semibold text-teal-700 hover:underline">
            View all courses
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-2xl font-extrabold text-stone-900">
          Browse by category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category} category={category} count={courses.filter((c) => c.category === category).length} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-labelledby="instructors-heading">
        <h2 id="instructors-heading" className="text-2xl font-extrabold text-stone-900">
          Meet your instructors
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              courseCount={courses.filter((c) => c.instructor === instructor.name).length}
            />
          ))}
        </div>
      </section>
    </>
  )
}
