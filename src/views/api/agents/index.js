import { Router } from 'express'
import controller from '../../../controllers/agent'

const router = Router()

router.get('/', controller.list, async (req, res) => {
  const { data: agents } = res
  res.status(200).json(agents)
})

router.get('/:id', controller.single, async (req, res) => {
  res.json(res.data)
})

router.post('/', controller.create, async (req, res) => {
  res.json(res.data)
})

router.put('/:id', controller.update, async (req, res) => {
  res.json(res.data)
})

router.delete('/:id', controller.deleteItem, async (req, res) => {
  res.json({ ok: true, message: 'Item deleted successfully.' })
})

export default router
