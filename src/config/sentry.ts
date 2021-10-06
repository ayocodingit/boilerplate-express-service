import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import config from '.'
import app from '../server'

Sentry.init({
  dsn: config.get('sentry.dsn'),
  environment: config.get('node.env'),
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({
      app
    })
  ],
  tracesSampleRate: Number(config.get('sentry.sample.rate', 0.0))
})

export default Sentry
