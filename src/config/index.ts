import config from 'env-dot-prop'
import dotEnv from 'dotenv'
dotEnv.config()

const decodeBase64 = (key: string = '') => {
  return Buffer.from(key, 'base64').toString().replace(/\\n/g, '\n')
}

config.set('jwt.secret', decodeBase64(config.get('jwt.secret')))
config.set('jwt.public', decodeBase64(config.get('jwt.public')))

export default config
