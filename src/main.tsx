import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

window.scrollTo(0, 0)

function ScrollReset() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScrollReset />
    <App />
  </StrictMode>
)
