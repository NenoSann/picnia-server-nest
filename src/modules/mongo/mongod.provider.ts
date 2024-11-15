import * as mongoose from 'mongoose';

export const mongodProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.MONGODB_URL),
  }
];
