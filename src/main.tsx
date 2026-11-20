import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/fraunces'
import '@fontsource/noto-sans-hk/400.css'
import '@fontsource/noto-sans-hk/500.css'
import '@fontsource/noto-sans-hk/600.css'
import '@fontsource/noto-sans-hk/700.css'
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
