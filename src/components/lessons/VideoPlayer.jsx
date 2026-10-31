import { useState } from 'react'
import { VideoOff } from 'lucide-react'

export default function VideoPlayer({ src, title }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-stone-900">
      {failed ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-stone-300">
          <VideoOff className="h-10 w-10" aria-hidden="true" />
          <p className="text-sm font-medium">The sample video could not be loaded. Check your connection and refresh.</p>
        </div>
      ) : (
        <video
          className="h-full w-full"
          controls
          preload="metadata"
          aria-label={`Video: ${title}`}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}
