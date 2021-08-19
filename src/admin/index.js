import AdminBro from 'admin-bro'
import AdminBroExpress from '@admin-bro/express'
import AdminBroMongoose from '@admin-bro/mongoose'

import Agent from '../models/agent'
import Amenity from '../models/amenity'
import Feedback from '../models/feedback'
import Location from '../models/location'
import Property from '../models/property'
import Upload from '../models/upload'

AdminBro.registerAdapter(AdminBroMongoose)

export const adminBro = new AdminBro({
  resources: [
    Agent,
    Amenity,
    Feedback,
    Location,
    Property,
    Upload
  ],
  rootPath: '/admin',
})

export default AdminBroExpress.buildRouter(adminBro)