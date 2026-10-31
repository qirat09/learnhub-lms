export default function EmptyState({ icon: Icon, title, message, children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center">
      {Icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
      )}
      <h2 className="text-xl font-bold text-stone-900">{title}</h2>
      {message && <p className="mt-2 text-stone-600">{message}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  )
}
