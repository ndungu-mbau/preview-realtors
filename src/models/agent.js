import mongoose, { Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const AgentSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    description: String,
    phone: String,
    email: String,
    profile: { type: 'ObjectId', ref: 'Upload', autopopulate: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    views: { createdAt: 'created', updatedAt: 'updated' },
  }
)

AgentSchema.virtual('full_name').get(function () {
  return this.first_name + ' ' + this.last_name
})

AgentSchema.plugin(autopopulate)

export default mongoose.model('Agent', AgentSchema)
