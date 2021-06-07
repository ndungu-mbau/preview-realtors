import { Router } from 'express'
import controller from '../../../controllers/property'

import individualPropertyController from '../../../controllers/individual'

const router = Router()

router.get('/', controller.list, async (req, res) => {
  res.render('properties', { properties: res.data })
})

router.get('/:id', controller.single, async (req, res, next) => {
  const { data: property } = res
  const individualProperties = await individualPropertyController.queryset({
    property: property._id,
  })

  property.properties = individualProperties
  res.render('property', { property })
})

router.get(
  '/:property_id/property/:id',
  individualPropertyController.single,
  async (req, res) => {
    res.render('individual', { property: res.data })
  }
)

export default router
