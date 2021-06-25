import mongoose, { Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Status = {
  RENT: 'rent',
  SALE: 'sale',
}

const PropertySchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    property_id: String,
    amenities: [{ type: 'ObjectId', ref: 'Amenity', autopopulate: true }],
    agent: { type: 'ObjectId', ref: 'Agent', autopopulate: true },
    status: {
      type: String,
      enum: [Status.RENT, Status.SALE],
      default: Status.RENT,
    },
    image: { type: 'ObjectId', ref: 'Upload', autopopulate: true },
    pictures: [{ type: 'ObjectId', ref: 'Upload', autopopulate: true }],
    views: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

PropertySchema.index(
  { title: 'text', description: 'text' },
  {
    weights: {
      title: 5,
      description: 2,
    },
  }
)
PropertySchema.plugin(autopopulate)

export default mongoose.model('Property', PropertySchema)
