import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { MangaProvider } from './contexts/MangaContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MangaProvider>
      <App />
    </MangaProvider>
  </StrictMode>
)
