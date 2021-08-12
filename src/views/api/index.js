import { Router } from 'express'

import agents from './agents'
import location from './location'
import properties from './properties'
import uploads from './uploads'
import amenities from './amenities'
import feedback from './feedback'

const router = Router()

router.use('/agents', agents)
router.use('/locations', location)
router.use('/properties', properties)
router.use('/uploads', uploads)
router.use('/amenities', amenities)
router.use('/feedback', feedback)

export default router
