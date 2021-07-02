import { Router } from 'express'
import controller from '../../../controllers/property'

import individualPropertyController from '../../../controllers/individual'

const router = Router()

// router.get('/', controller.list, async (req, res) => {
//   res.render('properties', { properties: res.data })
// })

router.get('/', async (req, res, next) => {
  const query = Object.entries(req.query)
    .filter(([key, val]) => val !== '')
    .reduce((acc, [key, val]) => {
      acc[key] = val
      return acc
    }, {})

  console.log(query)

  const propertiesQs = (
    await controller.queryset({
      query: {
        $text: {
          $search: req.query.keyword || '',
        },
      },
    })
  ).filter((prop) => {
    if (query.type) {
      if (prop.status === query.type) {
        return true
      }
      return false
    }
    return true
  })

  const populatedProperties = await Promise.all(
    propertiesQs.map(async (property) => {
      const individualProperties = await individualPropertyController.queryset({
        query: { property: property._id },
      })
      property.properties = individualProperties
      return property
    })
  )

  const properties = populatedProperties.filter((property) => {
    return property.properties.some((individual) => {
      const { beds, baths } = query
      return true
    })
  })

  console.log(properties)
  res.render('properties', { properties })
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
