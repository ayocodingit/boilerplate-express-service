import bodyParser from 'body-parser'
import express, { Application } from 'express'
import auth from './modules/auth/auth_handler'
import oauth from './modules/oauth/oauth_handler'
import config from './config'
import { onError } from './handler/exception'
import sentryTransaction from './middleware/sentry'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import connectionDB from './handler/connectionDB'

class App {
  public app: Application

  constructor () {
    this.app = express()
    this.plugins()
    this.handlers()
    this.extends()
  }

  protected plugins (): void {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(morgan('dev'))
    this.app.use(sentryTransaction)
  }

  protected handlers (): void {
    this.app.use('/v1', auth)
    this.app.use('/v1', oauth)
    this.app.use('/', connectionDB)
  }

  protected extends (): void {
    this.app.use(onError)
  }
}

const app = new App().app
const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`App listening at http://0.0.0.0:${PORT}`)
})

export default app
