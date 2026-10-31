import { useState } from 'react'
import { ImageOff } from 'lucide-react'

// Shows the image, or a neutral placeholder if the image fails to load.
export default function SafeImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-stone-200 text-stone-400 ${className}`}>
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
