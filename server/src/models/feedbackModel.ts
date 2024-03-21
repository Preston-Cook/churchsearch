import mongoose, { Schema } from 'mongoose';
import type { FeedbackModel, IFeedback, IFeedbackMethods } from '..';
import validator from 'validator';

const schema = new Schema<IFeedback, FeedbackModel, IFeedbackMethods>({
  email: {
    type: String,
    required: [true, 'Email Required'],
    validate: [validator.isEmail, 'Invalid Email'],
  },
  navigation: {
    type: String,
    trim: true,
  },
  filters: {
    type: String,
    trim: true,
  },
  testimonials: {
    type: String,
    trim: true,
  },
  recommendations: {
    type: String,
    trim: true,
  },
  feedback: {
    type: String,
    trim: true,
  },
});

const Feedback = mongoose.model<IFeedback, FeedbackModel>('Feedback', schema);
export default Feedback;
