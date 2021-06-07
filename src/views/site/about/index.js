import { Router } from 'express'

//Needed models: agent
import agentController from '../../../controllers/agent'

const router = Router()

router.get('/', async (req, res, next) => {
  const qs = await agentController.queryset({})
  // .sort('views')
  // .limit(4)
  // .exec()
  console.log(qs, typeof qs)
  // const data = qs.sort('views').limit(4).exec()

  // console.log(data)
  // const individualProperties = await individualPropertyController.queryset({
  //   property: { $in: data.map(({ _id }) => _id) },
  //   status: 'vacant'
  // })

  res.render('about', { title: 'About', home_active: true, agents: qs })
})

export default router
