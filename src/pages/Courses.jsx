import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX, SlidersHorizontal } from 'lucide-react'
import SearchBar from '../components/courses/SearchBar'
import FilterPanel from '../components/courses/FilterPanel'
import CourseCard from '../components/courses/CourseCard'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/common/Button'
import courses from '../data/courses'
import { LEVELS, filterCourses, getCategories } from '../utils/helpers'

export default function Courses() {
  const [params] = useSearchParams()
  const categories = getCategories(courses)

  const readCategory = () => (categories.includes(params.get('category')) ? params.get('category') : '')
  const readLevel = () => (LEVELS.includes(params.get('level')) ? params.get('level') : '')

  const [search, setSearch] = useState(params.get('search') || '')
  const [category, setCategory] = useState(readCategory)
  const [level, setLevel] = useState(readLevel)
  const [showFilters, setShowFilters] = useState(false)

  // Keep the page in sync when the URL changes (hero search, category cards, navbar link).
  useEffect(() => {
    setSearch(params.get('search') || '')
    setCategory(categories.includes(params.get('category')) ? params.get('category') : '')
    setLevel(LEVELS.includes(params.get('level')) ? params.get('level') : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const resetFilters = () => {
    setSearch('')
    setCategory('')
    setLevel('')
  }

  // Calculated on every render, not stored.
  const results = filterCourses(courses, { search, category, level })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-stone-900">All courses</h1>
      <p className="mt-2 text-stone-600">Search by title, topic or instructor, then narrow the list with filters.</p>

      <div className="mt-6 max-w-2xl">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <button
        type="button"
        onClick={() => setShowFilters((open) => !open)}
        aria-expanded={showFilters}
        aria-controls="filters"
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-100 md:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        {showFilters ? 'Hide filters' : 'Show filters'}
      </button>

      <div id="filters" className={`mt-4 md:block ${showFilters ? 'block' : 'hidden'}`}>
        <FilterPanel
          categories={categories}
          category={category}
          level={level}
          onCategoryChange={setCategory}
          onLevelChange={setLevel}
          onReset={resetFilters}
        />
      </div>

      <p className="mt-6 text-sm font-semibold text-stone-600" role="status">
        Showing {results.length} of {courses.length} courses
      </p>

      <div className="mt-4">
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState icon={SearchX} title="No courses match your search" message="Try a different keyword or clear the filters to see every course.">
            <Button onClick={resetFilters}>Reset Filters</Button>
          </EmptyState>
        )}
      </div>
    </div>
  )
}
