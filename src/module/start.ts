import bodyParser from 'body-parser'
import express from 'express'
import router from './handler/routes'
import config from './config'
import { onError } from './handler/logger'
import { sentryTransaction } from './handler/middleware'
import jwt from './handler/jwt'

const start = () => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(sentryTransaction)
  app.use('/api', jwt, router)
  app.use(onError)

  const PORT = config.get('port')
  app.listen(PORT, () => {
    console.log(`App listening at http://0.0.0.0:${PORT}`)
  })
}

export default start
