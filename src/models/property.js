import mongoose, { Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const PropertySchema = new Schema(
  {
    title: String,
    price: Number,
    beds: Number,
    baths: Number,
    location: { type: 'ObjectId', ref: 'Location', autopopulate: true },
    pictures: [{ type: 'ObjectId', ref: 'Upload', autopopulate: true }],
    views: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

PropertySchema.plugin(autopopulate)

export default mongoose.model('Property', PropertySchema)
