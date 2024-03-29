import { useEffect, useState } from 'react'

const getIsOnline = () => {
  return (
    typeof window === 'undefined' ||
    typeof navigator === 'undefined' ||
    !!window.navigator.onLine
  )
}

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(getIsOnline())

  useEffect(() => {
    const update = () => setIsOnline(getIsOnline())

    window.addEventListener('online', update)
    window.addEventListener('offline', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  return isOnline
}
