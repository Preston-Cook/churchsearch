import mongoose, { Schema, type Query } from 'mongoose';
import type { IUser, UserModel, IUserMethods } from '..';
import validator from 'validator';
import { ROLES } from '../config/constants';
import bcrypt from 'bcrypt';

const schema = new Schema<IUser, UserModel, IUserMethods>({
  first: {
    type: String,
    required: [true, 'First Name Required'],
    trim: true,
  },
  last: {
    type: String,
    required: [true, 'Last Name Required'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email Required'],
    validate: [validator.isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: [true, 'Password Required'],
    select: false,
    trim: true,
  },
  roles: {
    type: [String],
    enum: ROLES,
    default: undefined,
    required: [true, 'Role Required'],
  },
  refreshToken: {
    type: String,
    default: undefined,
  },
  bookmarkedChurches: {
    type: [Schema.Types.ObjectId],
    ref: 'Church',
    required: false,
  },
  isActive: {
    type: Boolean,
    select: false,
    default: true,
  },
  passwordResetToken: {
    type: String,
    default: undefined,
  },
  passwordRouteParameter: {
    type: String,
    default: undefined,
  },
});

// Compare passwords
schema.method(
  'correctPassword',
  async function correctPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
);

// Filter for active users on
schema.pre(/^find/, async function (this: Query<any, any>, next) {
  /* eslint-disable */
  this.where({ isActive: true });
  next();
});

// Create User Model
const User = mongoose.model<IUser, UserModel>('User', schema);

export default User;
