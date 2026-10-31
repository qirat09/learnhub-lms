import { Compass } from 'lucide-react'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <EmptyState icon={Compass} title="Page not found" message="The page you are looking for does not exist or has moved.">
        <Button to="/">Back to Home</Button>
      </EmptyState>
    </div>
  )
}
