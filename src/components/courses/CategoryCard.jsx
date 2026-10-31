import { Link } from 'react-router-dom'
import { Code2, Palette, Database, Briefcase, Terminal, Layers } from 'lucide-react'

const icons = {
  'Web Development': Code2,
  Design: Palette,
  'Data Science': Database,
  Business: Briefcase,
  Programming: Terminal,
}

export default function CategoryCard({ category, count }) {
  const Icon = icons[category] || Layers
  return (
    <Link
      to={`/courses?category=${encodeURIComponent(category)}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-stone-200 bg-white p-6 text-center transition-colors hover:border-teal-700"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-700 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="font-bold text-stone-900">{category}</span>
      <span className="text-sm text-stone-500">
        {count} {count === 1 ? 'course' : 'courses'}
      </span>
    </Link>
  )
}
