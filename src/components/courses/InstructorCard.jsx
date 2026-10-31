import SafeImage from '../common/SafeImage'

export default function InstructorCard({ instructor, courseCount }) {
  return (
    <article className="flex flex-col items-center rounded-xl border border-stone-200 bg-white p-6 text-center">
      <SafeImage src={instructor.photo} alt={`Portrait of ${instructor.name}`} className="h-24 w-24 rounded-full" />
      <h3 className="mt-4 text-lg font-bold text-stone-900">{instructor.name}</h3>
      <p className="text-sm font-semibold text-teal-700">{instructor.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">{instructor.bio}</p>
      <p className="mt-3 text-sm text-stone-500">
        Teaches {courseCount} {courseCount === 1 ? 'course' : 'courses'}
      </p>
    </article>
  )
}
