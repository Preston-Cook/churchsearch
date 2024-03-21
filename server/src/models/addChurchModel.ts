import mongoose, { Schema } from 'mongoose';
import type { IAddChurch, AddChurchModel, IAddChurchMethods } from '..';
import validator from 'validator';

const schema = new Schema<IAddChurch, AddChurchModel, IAddChurchMethods>({
  name: {
    type: String,
    required: [true, 'Name Required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email Required'],
    validate: [validator.isEmail, 'Invalid Email'],
  },
  church: {
    type: String,
    required: [true, 'Church Required'],
  },
  message: {
    type: String,
    trim: true,
  },
});

const AddChurch = mongoose.model<IAddChurch, AddChurchModel>(
  'AddChurch',
  schema
);
export default AddChurch;
