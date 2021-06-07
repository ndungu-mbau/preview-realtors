import mongoose, { isValidObjectId, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Status = {
  VACANT: 'vacant',
  OCCUPIED: 'occupied',
}

const IndividualPropertySchema = new Schema(
  {
    price: Number,
    house_number: String,
    area: Number,
    beds: Number,
    baths: Number,
    status: {
      type: String,
      enum: [Status.VACANT, Status.OCCUPIED],
      default: Status.VACANT,
    },
    picture: { type: 'ObjectId', ref: 'Upload', autopopulate: true },
    pictures: [{ type: 'ObjectId', ref: 'Upload', autopopulate: true }],
    property: { type: 'ObjectId', ref: 'Property', autopopulate: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

IndividualPropertySchema.plugin(autopopulate)

export default mongoose.model('IndividualProperty', IndividualPropertySchema)
