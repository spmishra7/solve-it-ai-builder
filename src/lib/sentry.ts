import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: import.meta.env.MODE,
      beforeSend(event) {
        // Don't send events in development
        if (import.meta.env.DEV) {
          console.log('Sentry event:', event);
          return null;
        }
        return event;
      },
    });
  }
};

export const captureException = (error: Error, context?: Record<string, any>) => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureMessage(message, {
      level,
    });
  }
}; 