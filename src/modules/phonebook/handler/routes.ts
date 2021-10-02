import express from 'express'
import { indexService, storeService } from '../service'
import { validate } from '../validator'
import { unique } from '../validator/rules'
import { StoreSchema } from '../validator/schemas'

const router = express.Router()

router.get('/phonebook', async (req, res) => {
  res.json(await indexService())
})

router.post('/phonebook', validate(StoreSchema, 'body'), async (req, res) => {

  const rules = await unique('phonebooks', 'email', req.body.email)
  if (rules.result) return res.json(rules.errors)

  await storeService(req.body)

  res.status(201).json({ message: 'CREATED' })
})

export default router
