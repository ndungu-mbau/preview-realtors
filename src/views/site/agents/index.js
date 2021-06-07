import { Router } from 'express'
import controller from '../../../controllers/agent'

const router = Router()

router.get('/', controller.list, async (req, res) => {
  const { data: agents } = res
  res.json(agents)
})

router.get('/:id', controller.single, async (req, res) => {
  const { data: agent } = res
  res.json(agent)
})

export default router
