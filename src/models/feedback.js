import mongoose, { Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const FeedbackSchema = new Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    views: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    views: { createdAt: 'created', updatedAt: 'updated' },
  }
)

FeedbackSchema.plugin(autopopulate)

export default mongoose.model('Feedback', FeedbackSchema)
