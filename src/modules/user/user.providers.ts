import { Mongoose } from 'mongoose';
import { UserSchema } from './user.schema';

export const userProviders = [
  {
    provide: 'USER',
    useFactory: (mongoose: Mongoose) => mongoose.model('USER', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
