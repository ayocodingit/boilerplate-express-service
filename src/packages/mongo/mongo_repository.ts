import './mongo_connect'
import mongoose from 'mongoose'

export namespace Mongo {
  export const model = (nameDocument: string, schema: any) => {
    return mongoose.model(nameDocument, schema)
  }
}