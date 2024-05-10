import { Button } from '@/components/ui-library/button'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

type Props = {
  errorMessage: string
  retryFn: any
  fullHeight?: boolean
  buttonName?: string
}

const ErrorScreen = ({
  errorMessage,
  retryFn,
  fullHeight = false,
  buttonName = 'Try Again',
}: Props) => {
  const [loading, setLoading] = React.useState(false)

  const onClickHandler = async () => {
    setLoading(true)
    try {
      await retryFn()
    } catch (error) {
      console.error('Error during retry operation', error)
    }
    setLoading(false)
  }

  return (
    <div
      className={`flex flex-col gap-4 items-center justify-center w-full ${fullHeight ? 'min-h-screen' : ''}`}
    >
      <h3 className="text-2xl w-full md:w-[80%] lg:w-[50%] text-center">
        {errorMessage}
      </h3>
      <Button onClick={onClickHandler}>
        <div className="flex gap-2">
          {!!loading && <LoaderCircle className="animate-spin" />}
          {buttonName}
        </div>
      </Button>
    </div>
  )
}

export default ErrorScreen
