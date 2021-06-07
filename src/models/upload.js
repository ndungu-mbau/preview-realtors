import mongoose, { Schema } from 'mongoose'

const UploadSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    secure_url: String,
    views: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
)

export default mongoose.model('Upload', UploadSchema)
