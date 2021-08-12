import { Router } from 'express'

//Needed models: property
import locationController from '../../../controllers/location'
// import individualPropertyController from '../../../controllers/individual'

const router = Router()

router.get('/', async (req, res, next) => {
  const qs = await locationController.queryset({
    query: { views: { $gte: 10 } },
    sort: 'views',
    limit: 4,
  })

  const properties = await locationController.queryset({})
  const for_sale = properties.filter((property) => property.status === 'sale')
  const for_rent = properties.filter((property) => property.status === 'rent')

  // const individualProperties = await individualPropertyController.queryset({
  //   property: { $in: data.map(({ _id }) => _id) },
  //   status: 'vacant'
  // })

  res.render('index', {
    title: 'Home',
    popular: qs,
    top: qs,
    for_sale: for_sale.length,
    for_rent: for_rent.length,
    top: properties
  })
})

export default router
