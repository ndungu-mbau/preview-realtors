import { Router } from 'express'
import properties from './properties'
import home from './home'
import uploads from './uploads'
import about from './about'

const router = Router()

router.use('/', home)
router.use('/properties', properties)
router.use('/uploads', uploads)
router.use('/about', about)

router.get('/contact', (req, res, next) => {
  res.render('contact', { contact_active: true })
})

export default router
