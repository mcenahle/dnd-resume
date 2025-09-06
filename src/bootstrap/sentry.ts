import * as Sentry from '@sentry/react'

if (import.meta.env.SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.SENTRY_DSN,
    environment: import.meta.env.MODE,
    release: 'dnd-' + __DATE__,
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
      Sentry.thirdPartyErrorFilterIntegration({
        filterKeys: ['dnd-resume'],
        behaviour: 'drop-error-if-contains-third-party-frames',
      }),
    ],
    // Tracing Options: https://docs.sentry.io/platforms/javascript/guides/react/tracing/
    tracesSampleRate: 0.2,
    // Session Replay Options: https://docs.sentry.io/platforms/javascript/guides/react/session-replay/
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1,
  })
}
