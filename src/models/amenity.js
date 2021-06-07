import mongoose, { Schema } from 'mongoose'

const AmenitySchema = new Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

export default mongoose.model('Amenity', AmenitySchema)
