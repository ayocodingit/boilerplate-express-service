import mongoose, { Schema } from 'mongoose'
import config from '.'

mongoose.connect(config.get('mongo.connection'))

export default (document: string, schema: Schema) => {
  return mongoose.model(document, schema)
}
