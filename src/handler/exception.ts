import * as express from 'express'
import Sentry from '../config/sentry'
import { CustomError } from 'ts-custom-error'

export const onError = (error: any, request: express.Request, response: express.Response, next: any) => {
  if (error.status >= 500) {
    const logger = {
      method: request.method,
      url: request.path,
      userAgent: request.headers['user-agent'],
      date: new Date(),
      statusCode: error.status,
      message: error.message
    }

    console.log(JSON.stringify(logger))
    Sentry.captureException(error)
  }

  return response.status(error.status).json({ error: error.message })
}

export class HttpError extends CustomError {
  public constructor (
      public code: number,
      message?: string,
      public isObject: boolean = false
  ) {
    super(message)
  }
}
