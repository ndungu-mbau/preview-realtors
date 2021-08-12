import mongoose, { isValidObjectId, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Status = {
  RENT: 'rent',
  SALE: 'sale',
}

const LocationSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    property_id: String,
    amenities: [{ type: 'ObjectId', ref: 'Amenity', autopopulate: true }],
    status: {
      type: String,
      enum: [Status.RENT, Status.SALE],
      default: Status.SALE,
    },
    picture: { type: 'ObjectId', ref: 'Upload', autopopulate: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

LocationSchema.index(
    { title: 'text', description: 'text' },
    {
      weights: {
        title: 5,
        description: 2,
      },
    }
  )

LocationSchema.plugin(autopopulate)

export default mongoose.model('Location', LocationSchema)
