import { Button } from '@/components/ui-library/button'

type Props = {
  errorMessage: string
  retryFn: any
  fullHeight?: boolean
}

const ErrorScreen = ({ errorMessage, retryFn, fullHeight = false }: Props) => {
  return (
    <div
      className={`flex flex-col gap-4 items-center justify-center ${fullHeight ? 'min-h-screen' : ''}`}
    >
      <h3 className="text-2xl">{errorMessage}</h3>
      <Button onClick={() => retryFn()}>Try Again</Button>
    </div>
  )
}

export default ErrorScreen
