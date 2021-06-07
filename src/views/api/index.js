import { Router } from 'express'

import agents from './agents'
import properties from './properties'
import individualProperty from './individual'
import uploads from './uploads'
import amenities from './amenities'
import feedback from './feedback'

const router = Router()

router.use('/agents', agents)
router.use('/properties', properties)
router.use('/property', individualProperty)
router.use('/uploads', uploads)
router.use('/amenities', amenities)
router.use('/feedback', feedback)

export default router
