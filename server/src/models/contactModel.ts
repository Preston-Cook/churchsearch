import mongoose, { Schema } from 'mongoose';
import type { IContact, ContactModel, IContactMethods } from '..';
import validator from 'validator';
import { SUBJECTS } from '../config/constants';

const schema = new Schema<IContact, ContactModel, IContactMethods>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name Required'],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Invalid Email'],
  },
  company: String,
  subject: {
    type: String,
    required: [true, 'Subject Required'],
    enum: SUBJECTS,
  },
  message: {
    type: String,
    trim: true,
    required: [true, 'Message Required'],
  },
});

const Contact = mongoose.model<IContact, ContactModel>('Contact', schema);
export default Contact;
