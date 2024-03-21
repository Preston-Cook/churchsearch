import type { Model, Schema } from 'mongoose';

// User model types
interface IUser {
  email: string;
  first: string;
  last: string;
  roles: string[] | undefined;
  password: string;
  isActive: boolean;
  bookmarkedChurches: Schema.Types.ObjectId[];
  refreshToken: string | undefined;
  passwordResetToken: string | undefined;
  passwordRouteParameter: string | undefined;
}

interface IUserMethods {
  correctPassword: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<IUser, unknown, IUserMethods> {}

// Church model types
interface IChurch {
  name: string;
  pastorName: string;
  pastorBio: string;
  pastorImage: string;
  denomination: string[] | undefined;
  images: string[] | undefined;
  attendance: string;
  vibe: string;
  serviceTimes: IServiceTime[];
  ministry: string[] | undefined;
  preaching: string[];
  worship: string;
  location: {
    type: string;
    coordinates: number[];
  };
  street: string;
  city: string;
  state: string;
  zip: string;
  serviceOpportunities: boolean;
  missionTrips: boolean;
  counseling: boolean;
  featured: boolean;
  testimonials: Schema.Types.ObjectId[];
  preferredContact: string;
  contactType: string;
}

/* eslint-disable */
interface IChurchMethods {}

interface ChurchModel extends Model<IChurch, unknown, IChurchMethods> {}

// Service Time Model Types
interface IServiceTime {
  day: string;
  hour: string;
  minute: string;
  category: string;
}

interface IServiceTimeMethods {}

interface ServiceTimeModel
  extends Model<IServiceTime, unknown, IServiceTimeMethods> {}

// Testimonial Model Types
interface ITestimonial {
  name: string;
  denomination: string;
  worship: string;
  preaching: string;
  community: string;
}

interface ITestimonialMethods {}

interface TestimonialModel
  extends Model<ITestimonial, unknown, ITestimonialMethods> {}

// Contact Model Types
interface IContact {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

interface IContactMethods {}

interface ContactModel extends Model<IContact, unknown, IContactMethods> {}

// Feedback Model Types
interface IFeedback {
  email: string;
  navigation: string;
  filters: string;
  testimonials: string;
  recommendations: string;
  feedback: string;
}

interface IFeedbackMethods {}

interface FeedbackModel extends Model<IFeedback, unknown, IFeedbackMethods> {}

// Add Church Model Types
interface IAddChurch {
  name: string;
  email: string;
  church: string;
  message: string;
}

interface IAddChurchMethods {}

interface AddChurchModel
  extends Model<IAddChurch, unknown, IAddChurchMethods> {}

// Global app error
interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

// Extend Request Object
declare module 'express-serve-static-core' {
  export interface Request {
    userName?: string;
    userId?: string;
    email?: string;
    roles?: string[];
    pastorImage: string;
    churchImages: string[];
  }
}
