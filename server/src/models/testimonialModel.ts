import mongoose, { Schema } from 'mongoose';
import type { ITestimonial, TestimonialModel, ITestimonialMethods } from '..';

const schema = new Schema<ITestimonial, TestimonialModel, ITestimonialMethods>({
  name: {
    type: String,
    required: [true, 'Name Required'],
  },
  denomination: {
    type: String,
    required: [true, 'Denomination Required'],
  },
  worship: {
    type: String,
    required: [true, 'Worship Required'],
  },
  preaching: {
    type: String,
    required: [true, 'Preaching Required'],
  },
  community: {
    type: String,
    required: [true, 'Community Required'],
  },
});

const Testimonial = mongoose.model<ITestimonial, TestimonialModel>(
  'Testimonial',
  schema
);
export default Testimonial;
