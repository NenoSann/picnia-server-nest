import { Connection } from 'mongoose'
import { commentSchema } from './comment.schema'

export const CommentProvider = {
  provide: 'COMMENT_MODEL',
  useFactory: (connection: Connection) => connection.model('Comment', commentSchema),
  inject: ['DATABASE_CONNECTION'],
}