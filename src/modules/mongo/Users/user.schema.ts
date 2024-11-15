import * as mongoose from 'mongoose'
const defaultAvatar = 'imagebucket-1322308688.cos.ap-tokyo.myqcloud.com/picnia/avatar/default/default.png'

export const UserSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  userName: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  avatar: {
    type: mongoose.Schema.Types.String,
    default: defaultAvatar,
  },
  avatar_v: {
    type: mongoose.Schema.Types.Number,
    default: 0,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: undefined,
  },
  userBrief: {
    type: mongoose.Schema.Types.String,
    default: undefined,
  },
  likeList: {
    type: [mongoose.Schema.Types.ObjectId],
    default: undefined,
  },
  saveList: {
    type: [mongoose.Schema.Types.ObjectId],
    default: undefined,
  },
  createDate: mongoose.Schema.Types.Date,
})