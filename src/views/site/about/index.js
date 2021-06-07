import { Router } from 'express'

//Needed models: agent
import agentController from '../../../controllers/agent'

const router = Router()

router.get('/', async (req, res, next) => {
  const qs = await agentController.queryset({ limit: 4, sort: 'views' })

  res.render('about', { title: 'About', agents: qs })
})

export default router
