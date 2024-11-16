import * as mongoose from 'mongoose'

export const PostSchema = new mongoose.Schema({
  image: {
    type: mongoose.Schema.Types.String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: undefined,
  },
  location: {
    type: mongoose.Schema.Types.String,
  },
  date: {
    type: mongoose.Schema.Types.Date,
  },
  content: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: undefined,
  },
  likes: {
    type: mongoose.Schema.Types.Number,
    default: 0,
  },
  saves: {
    type: mongoose.Schema.Types.Number,
    default: 0,
  },
  commentsCount: {
    type: mongoose.Schema.Types.Number,
    default: 0
  },
  isInvalid: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  }
})