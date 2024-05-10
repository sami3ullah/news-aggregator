import ErrorScreen from '@/components/custom/error-screen/ErrorScreen'
import Header from '@/components/custom/header/Header'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="container grid place-items-center min-h-[calc(100vh-64px)]">
        <ErrorScreen
          errorMessage="Oh no! You seems lost (>.<)"
          retryFn={() => navigate('/')}
          buttonName="Go Back"
        />
      </div>
    </div>
  )
}

export default NotFound
