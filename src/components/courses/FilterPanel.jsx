import { RotateCcw } from 'lucide-react'
import { LEVELS } from '../../utils/helpers'

const selectClass =
  'w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-900 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/30 focus:outline-hidden'

export default function FilterPanel({ categories, category, level, onCategoryChange, onLevelChange, onReset }) {
  return (
    <div className="grid gap-4 rounded-xl border border-stone-200 bg-white p-4 sm:grid-cols-3 sm:items-end">
      <div>
        <label htmlFor="filter-category" className="mb-1 block text-sm font-semibold text-stone-700">
          Category
        </label>
        <select id="filter-category" value={category} onChange={(e) => onCategoryChange(e.target.value)} className={selectClass}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-level" className="mb-1 block text-sm font-semibold text-stone-700">
          Difficulty level
        </label>
        <select id="filter-level" value={level} onChange={(e) => onLevelChange(e.target.value)} className={selectClass}>
          <option value="">All levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-100"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reset Filters
      </button>
    </div>
  )
}
