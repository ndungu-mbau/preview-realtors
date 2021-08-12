import { Router } from 'express'
import controller from '../../../controllers/location'

import propertyController from '../../../controllers/property'

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

  const locationQs = req.query.keyword ? (
    await controller.queryset({
      query: {
        $text: {
          $search: req.query.keyword,
        },
      },
    })
  ) : await controller.queryset({query: {}})

  const locations = locationQs.filter((loc) => {
    if (query.type) {
      if (loc.status === query.type) {
        return true
      }
      return false
    }
    return true
  })

  const populatedLocations = await Promise.all(
    locations.map(async (location) => {
      const properties = await propertyController.queryset({
        query: { location: location._id },
      })
      // console.log(properties)
      location.properties = properties
      return location
    })
  )

  // console.log(populatedLocations)

  const properties = populatedLocations.filter((location) => {
    return location.properties.some((individual) => {
      const { beds, baths } = query
      return true
    })
  })

  console.log(properties)
  res.render('properties', { properties })
})

router.get('/:id', controller.single, async (req, res, next) => {
  const { data: location } = res
  const properties = await propertyController.queryset({
    location: location._id,
  })

  location.properties = properties
  console.log(properties)
  res.render('property', { property: location, properties })
})

router.get(
  '/:location_id/property/:id',
  propertyController.single,
  async (req, res) => {
    res.render('individual', { property: res.data })
  }
)

export default router
