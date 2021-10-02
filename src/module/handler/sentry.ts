import * as Sentry from '@sentry/node'
import config from '../config'

Sentry.init({
  dsn: config.get('sentry.dsn'),
  environment: config.get('node.env'),
  integrations: [
    new Sentry.Integrations.Http({ tracing: true })
  ],
  tracesSampleRate: Number(config.get('sentry.sample.rate', 0.0))
})

export default Sentry
