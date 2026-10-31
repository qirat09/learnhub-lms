import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GraduationCap, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/courses', label: 'Courses' },
  { to: '/dashboard', label: 'My Learning' },
]

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'bg-teal-50 text-teal-800' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
  }`

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-stone-900" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          LearnHub
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" title="Signed-in learner (display only)">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-900" aria-hidden="true">
              AM
            </span>
            <span className="hidden text-sm font-semibold text-stone-700 sm:block">Alex Morgan</span>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-stone-700 hover:bg-stone-100 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="flex flex-col gap-1 border-t border-stone-200 bg-white px-4 py-3 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setMenuOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
