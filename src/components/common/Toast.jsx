import { CheckCircle2, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  if (!message) return null
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6" role="status" aria-live="polite">
      <div className="flex max-w-md items-center gap-3 rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
        <span>{message}</span>
        <button type="button" onClick={onClose} aria-label="Dismiss message" className="rounded p-1 text-stone-300 hover:text-white">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
