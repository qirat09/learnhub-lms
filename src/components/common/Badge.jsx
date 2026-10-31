const styles = {
  category: 'bg-teal-50 text-teal-800',
  Beginner: 'bg-emerald-50 text-emerald-800',
  Intermediate: 'bg-amber-50 text-amber-800',
  Advanced: 'bg-rose-50 text-rose-800',
  success: 'bg-emerald-100 text-emerald-800',
}

export default function Badge({ variant = 'category', children }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant] || styles.category}`}>
      {children}
    </span>
  )
}
