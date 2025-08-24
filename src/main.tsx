import { ErrorBoundary } from '@/components/layout/error-boundary.tsx'
import { Toaster } from '@/components/ui/sonner.tsx'
import '@/index.css'
import '@/init/sentry.ts'
import '@/init/google-tag.ts'
import '@/locales/i18n.ts'
import { PageEdit } from '@/pages/edit/page.tsx'
import { PagePreview } from '@/pages/preview/page.tsx'
import { PagePrint } from '@/pages/print/page.tsx'
import * as Sentry from '@sentry/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

const container = document.getElementById('root')!
const root = createRoot(
  container,
  import.meta.env.SENTRY_DSN && {
    // Callback called when an error is thrown and not caught by an ErrorBoundary.
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn('Uncaught error', error, errorInfo.componentStack)
    }),
    // Callback called when React catches an error in an ErrorBoundary.
    onCaughtError: Sentry.reactErrorHandler(),
    // Callback called when React automatically recovers from errors.
    onRecoverableError: Sentry.reactErrorHandler(),
  },
)
root.render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster
          position="top-center"
          richColors
          closeButton
          offset={52}
        />
        <Routes>
          <Route
            path="/"
            element={<PageEdit />}
          />
          <Route
            path="/edit"
            element={<PageEdit />}
          />
          <Route
            path="/preview"
            element={<PagePreview />}
          />
          <Route
            path="/print"
            element={<PagePrint />}
          />
        </Routes>
        <Analytics />
        <SpeedInsights sampleRate={0.2} />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
