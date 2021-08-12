import { Router } from 'express'
import locations from './locations'
import home from './home'
import uploads from './uploads'
import about from './about'

const router = Router()

router.use('/', home)
router.use('/locations', locations)
router.use('/uploads', uploads)
router.use('/about', about)

router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact', contact_active: true })
})

export default router
