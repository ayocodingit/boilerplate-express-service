import bodyParser from 'body-parser'
import express from 'express'
import auth from './modules/auth/handler'
import oauth from './modules/oauth/handler'
import config from './config'
import { onError } from './handler/exception'
import sentryTransaction from './middleware/sentry'
import cors from 'cors'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(sentryTransaction)
// load module
app.use('/api', auth)
app.use('/api', oauth)
// end load module
app.use(onError)

const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})
