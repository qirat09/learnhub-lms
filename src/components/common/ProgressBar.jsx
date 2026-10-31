export default function ProgressBar({ percent, label = 'Course progress' }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2.5 flex-1 overflow-hidden rounded-full bg-stone-200"
        role="progressbar"
        aria-label={label}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full rounded-full bg-teal-600 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
      <span className="w-10 text-right text-sm font-semibold text-stone-700">{percent}%</span>
    </div>
  )
}
