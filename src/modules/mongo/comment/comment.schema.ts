import * as mongoose from 'mongoose'
import { IComment } from './dto'

const commentSchema = new mongoose.Schema<IComment>({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reception: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
  },
  content: {
    type: mongoose.Schema.Types.String,
    required: true,
  }
})

export { commentSchema }