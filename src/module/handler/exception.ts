import Sentry from './sentry'

const sentryCaptureException = (error: Error) => {
  Sentry.captureException(error)
}

export default sentryCaptureException
