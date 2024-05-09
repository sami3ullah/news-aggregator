import { Button } from '@/components/ui-library/button'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

type Props = {
  errorMessage: string
  retryFn: any
  fullHeight?: boolean
}

const ErrorScreen = ({ errorMessage, retryFn, fullHeight = false }: Props) => {
  const [loading, setLoading] = React.useState(false)

  const onClickHandler = async () => {
    setLoading(true)
    try {
      await retryFn() // Wait for the retry function to complete
    } catch (error) {
      console.error('Error during retry operation', error)
    }
    setLoading(false) // Set loading to false after retryFn completes
  }

  return (
    <div
      className={`flex flex-col gap-4 items-center justify-center ${fullHeight ? 'min-h-screen' : ''}`}
    >
      <h3 className="text-2xl w-full md:w-[80%] lg:w-[50%] text-center">
        {errorMessage}
      </h3>
      <Button onClick={onClickHandler}>
        <div className="flex gap-2">
          {!!loading && <LoaderCircle className="animate-spin" />}
          Try Again
        </div>
      </Button>
    </div>
  )
}

export default ErrorScreen
