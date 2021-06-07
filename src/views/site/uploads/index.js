import { Router } from 'express'
import controller from '../../../controllers/upload'

const router = Router()

router.get('/', controller.list, async (req, res, next) => {
  const { data: uploads } = res
  res.json(uploads)
})

router.get('/:id', controller.single, async (req, res, next) => {
  const { data: upload } = res
  res.json(upload)
})

export default router
