import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import './index.css'
import { queryClient } from './utils/reactQueryConfig'
import ErrorBoundaryWrapped from './components/custom/error-boundary/ErrorBoundaryWrapped'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundaryWrapped>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </ErrorBoundaryWrapped>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
