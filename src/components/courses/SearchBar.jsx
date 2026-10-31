import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search courses, topics or instructors' }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) onSubmit(value)
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="flex w-full gap-2">
      <div className="relative flex-1">
        <label htmlFor="course-search" className="sr-only">
          Search courses
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
        <input
          id="course-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stone-300 bg-white py-3 pr-3 pl-10 text-stone-900 placeholder:text-stone-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/30 focus:outline-hidden"
        />
      </div>
      <button type="submit" className="rounded-lg bg-amber-400 px-5 py-3 text-sm font-bold text-stone-900 transition-colors hover:bg-amber-300">
        Search
      </button>
    </form>
  )
}
