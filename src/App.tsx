import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import './index.css'

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
      <App />
    </BrowserRouter>
  )
}
