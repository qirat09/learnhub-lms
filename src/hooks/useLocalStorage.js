import { useState, useEffect } from 'react'

// Reads a saved value safely. Bad or mismatched data falls back to initialValue.
function readValue(key, initialValue) {
  try {
    const saved = localStorage.getItem(key)
    if (saved === null) return initialValue
    const parsed = JSON.parse(saved)
    const sameShape =
      Array.isArray(parsed) === Array.isArray(initialValue) &&
      typeof parsed === typeof initialValue &&
      parsed !== null
    return sameShape ? parsed : initialValue
  } catch {
    return initialValue
  }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage may be full or blocked - the app keeps working in memory.
    }
  }, [key, value])

  return [value, setValue]
}
