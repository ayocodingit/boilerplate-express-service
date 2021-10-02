import bodyParser from 'body-parser'
import express from 'express'
import phonebook from './modules/phonebook/handler/routes'
import config from './config'
import { onError } from './handler/exception'
import sentryTransaction from './middleware/sentry'
import jwt from './middleware/jwt'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(sentryTransaction)
app.use('/api', jwt, phonebook)
app.use(onError)

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
