import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary: 'bg-teal-700 text-white hover:bg-teal-800 disabled:hover:bg-teal-700',
  dark: 'bg-stone-900 text-white hover:bg-stone-700',
  outline: 'border border-stone-300 bg-white text-stone-800 hover:bg-stone-100 disabled:hover:bg-white',
  success: 'border border-emerald-200 bg-emerald-50 text-emerald-800',
}

// Renders a router Link when `to` is given (and not disabled), otherwise a button.
export default function Button({ variant = 'primary', to, disabled = false, className = '', children, ...rest }) {
  const classes = `${base} ${variants[variant]} ${className}`
  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  )
}
