import express from 'express'
import { indexService, storeService } from '../service'
import validate from '../validator'
import { StoreSchema } from '../validator/schemas'

const router = express.Router()

router.get('/', async (req, res) => {
  res.json(await indexService())
})

router.post('/', validate(StoreSchema, 'body'), async (req, res) => {
  res.json(await storeService(req.body))
})

export default router
