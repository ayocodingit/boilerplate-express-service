import express from 'express'
import httpStatus from 'http-status'
import { indexService, storeService } from '../service'
import { validate } from '../validator'
import { unique } from '../validator/rules'
import { StoreSchema } from '../validator/schemas'

const phonebook = express.Router()

phonebook.get('/phonebook', async (req, res) => {
  res.json(await indexService())
})

phonebook.post('/phonebook', validate(StoreSchema, 'body'), async (req, res) => {
  try {
    await unique('phonebooks', 'email', req.body.email)
    await storeService(req.body)
    res.status(httpStatus.CREATED).json({ message: 'CREATED' })
  } catch (error) {

  }
})

export default phonebook
