export default function Spinner({ label = 'Loading courses...' }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4" role="status">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-200 border-t-teal-700" />
      <p className="text-sm font-medium text-stone-500">{label}</p>
    </div>
  )
}
