import * as express from 'express'
import Sentry from '../config/sentry'

export const onError = (error: any, request: express.Request, response: express.Response, next: any) => {
  if (error.code >= 500) {
    const logger = {
      method: request.method,
      url: request.path,
      userAgent: request.headers['user-agent'],
      date: new Date(),
      statusCode: error.code,
      message: error.message
    }
    console.log(JSON.stringify(logger))
    Sentry.captureException(error)
  }
  next(error)
}
