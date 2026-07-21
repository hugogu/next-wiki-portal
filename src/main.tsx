import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/inter'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n.tsx'

const app = (
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
)

// dist/index.html is prerendered at build time; React re-mounts over it
// client-side (entrance animations replay once, no blank flash).
createRoot(document.getElementById('root')!).render(app)
