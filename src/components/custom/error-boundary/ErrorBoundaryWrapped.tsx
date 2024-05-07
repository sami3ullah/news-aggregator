import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorScreen from '../error-screen/ErrorScreen'

type Props = {
  children: React.ReactNode
  error?: string
}

const ErrorBoundaryWrapped = ({
  children,
  error = 'Uh oh. Something wrong happened :(',
}: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorScreen
              errorMessage={error}
              retryFn={resetErrorBoundary}
              fullHeight={true}
            />
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default ErrorBoundaryWrapped
