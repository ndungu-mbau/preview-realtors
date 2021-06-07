import { Router } from 'express'

//Needed models: property
import propertyController from '../../../controllers/property'
// import individualPropertyController from '../../../controllers/individual'

const router = Router()

router.get('/', async (req, res, next) => {
  const qs = await propertyController.queryset({
    query: { views: { $gte: 10 } },
    sort: 'views',
    limit: 4,
  })

  // const individualProperties = await individualPropertyController.queryset({
  //   property: { $in: data.map(({ _id }) => _id) },
  //   status: 'vacant'
  // })

  res.render('index', { title: 'Home', home_active: true, popular: qs })
})

export default router
