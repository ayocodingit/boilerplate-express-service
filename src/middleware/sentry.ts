import sentry from '../config/sentry'
import * as express from 'express'

export default (req: express.Request, res: express.Request, next: any) => {
  const transaction = sentry.startTransaction({
    op: 'transaction',
    name: req.url
  })

  sentry.configureScope(scope => {
    scope.setSpan(transaction)
  })

  res.on('finish', function () {
    transaction.finish()
  })

  next()
}
