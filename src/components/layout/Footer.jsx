import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'All courses' },
  { to: '/dashboard', label: 'My Learning' },
]

export default function Footer() {
  return (
    <footer className="mt-16 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            LearnHub
          </Link>
        </div>
        <div>
          <h2 className="text-base font-bold text-white">Quick links</h2>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-bold text-white">About LearnHub</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            LearnHub is a free practice platform. Enroll in a course, watch lessons and track your progress. Your progress is saved on this device only.
          </p>
        </div>
      </div>
      <div className="border-t border-stone-700 py-5 text-center text-sm">
        &copy; {new Date().getFullYear()} LearnHub. All rights reserved.
      </div>
    </footer>
  )
}
