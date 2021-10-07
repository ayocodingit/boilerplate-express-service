import mongoose from 'mongoose'
import config from '../../config'

mongoose.connect(config.get('mongo.connection'))
.then(() => null)
.catch(() => null)