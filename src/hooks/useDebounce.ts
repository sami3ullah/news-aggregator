import { useState, useEffect } from 'react'

type CallbackFunction<T> = (...args: T[]) => void

function useDebounce<T>(
  callback: CallbackFunction<T>,
  delay: number = 500
): CallbackFunction<T> {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  const debouncedFunction = (...args: T[]) => {
    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(() => {
      callback(...args)
    }, delay)

    setTimer(newTimer)
  }

  return debouncedFunction
}

export default useDebounce
