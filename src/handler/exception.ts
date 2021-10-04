import Sentry from '../config/sentry'
import { CustomError } from 'ts-custom-error'
import httpStatus from 'http-status'
import config from '../config'

export const onError = (error: any, req: any, res: any, next: any) => {
  if (error.code >= httpStatus.INTERNAL_SERVER_ERROR) {
    const logger = {
      method: req.method,
      url: req.path,
      userAgent: req.headers['user-agent'],
      date: new Date(),
      statusCode: error.code,
      message: error.message
    }

    console.log(JSON.stringify(logger))
    Sentry.captureException(error)
  }

  error.code = typeof error.code === 'string' ? error.status || httpStatus.INTERNAL_SERVER_ERROR : error.code
  return res.status(error.code).json(messageError(error))
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

const messageError = (error: any) => {
  if (error.isObject) return JSON.parse(error.message)
  const isEnvProduction: boolean = config.get('node.env') === 'production' && error.code >= httpStatus.INTERNAL_SERVER_ERROR
  const message = isEnvProduction ? httpStatus[Number(error.code)] : error.message
  return { error: message }
}
