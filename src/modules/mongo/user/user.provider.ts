import { Connection } from 'mongoose'
import { UserSchema } from './user.schema'
import { IUser } from './user.interface'

export const UserProvider = {
  provide: 'USER_MODEL',
  useFactory: (connection: Connection) => connection.model('User', UserSchema),
  inject: ['DATABASE_CONNECTION'],
}