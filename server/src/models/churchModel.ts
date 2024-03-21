import mongoose, { Schema } from 'mongoose';
import type { IChurch, ChurchModel, IChurchMethods } from '..';
import serviceTimeSchema from './schemas/serviceTimes';
import AppError from '../utils/appError';
import dotenv from 'dotenv-safe';
import {
  DENOMINATIONS,
  WORSHIP,
  PREACHING,
  MINISTRY,
  VIBE,
  ATTENDANCE,
  STATES,
  CONTACT_TYPE,
} from '../config/constants';
dotenv.config();

const schema = new Schema<IChurch, ChurchModel, IChurchMethods>({
  name: {
    type: String,
    required: [true, 'Church Name Required'],
    trim: true,
  },
  pastorName: {
    type: String,
    required: [true, 'Pastor Name Required'],
    trim: true,
  },
  pastorBio: {
    type: String,
    required: [true, 'Pastor Biography Required'],
    trim: true,
  },
  pastorImage: {
    type: String,
    required: [true, 'Pastor Image Required'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  },
  street: {
    type: String,
    required: [true, 'Street Required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City Required'],
    trim: true,
  },
  state: {
    type: String,
    enum: STATES,
    required: [true, 'State Required'],
  },
  zip: {
    type: String,
    required: [true, 'Zip Code Required'],
    trim: true,
  },
  images: {
    type: [String],
    default: undefined,
    required: [true, 'Church Images Required'],
  },
  serviceTimes: [serviceTimeSchema],
  denomination: {
    type: [String],
    enum: DENOMINATIONS,
    default: undefined,
    required: [true, 'Chruch Denominations Required'],
  },
  attendance: {
    type: String,
    enum: ATTENDANCE,
    required: [true, 'Church Attendance Required'],
  },
  vibe: {
    type: String,
    enum: VIBE,
    required: [true, 'Church Vibe Required'],
  },
  ministry: {
    type: [String],
    enum: MINISTRY,
    default: undefined,
    required: [true, 'Church Ministry Types Required'],
  },
  preaching: {
    type: [String],
    enum: PREACHING,
    default: undefined,
    required: [true, 'Church Preaching Types Required'],
  },
  worship: {
    type: String,
    enum: WORSHIP,
    required: [true, 'Church Worship Required'],
  },
  serviceOpportunities: {
    type: Boolean,
    default: false,
    required: [true, 'Service Opportunities Required'],
  },
  missionTrips: {
    type: Boolean,
    default: false,
    required: [true, 'Mission Trips Required'],
  },
  counseling: {
    type: Boolean,
    default: false,
    required: [true, 'Church Counseling Required'],
  },
  testimonials: {
    type: [Schema.Types.ObjectId],
    ref: 'Testimonial',
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  preferredContact: {
    type: String,
    default: null,
    required: [true, 'Preferred Contact Required'],
  },
  contactType: {
    type: String,
    enum: CONTACT_TYPE,
    required: [true, 'Contact Type Required'],
  },
});

// Create 2d index to allow GeoJSON Querying
schema.index({ location: '2dsphere' });

schema.pre('save', async function (next) {
  // Retrieve environment variables
  const API_ENDPOINT = process.env.GOOGLE_GEOCODING_ENDPOINT as string;
  const API_KEY = process.env.GOOGLE_GEOCODING_API_KEY as string;

  // Create Param String
  const params = new URLSearchParams({
    address: `${this.street} ${this.city}, ${this.state} ${this.zip}`,
    key: API_KEY,
  }).toString();

  // Fetch Google Geocoding API
  try {
    const res = await fetch(`${API_ENDPOINT}?${params}`);
    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();

    const { lng, lat } = data.results[0].geometry.location;

    this.location.coordinates = [lng, lat];
    this.location.type = 'Point';
  } catch {
    next(new AppError('Something Went Wrong', 400));
  }
  next();
});

// Create Church Model
const Church = mongoose.model<IChurch, ChurchModel>('Church', schema);

export default Church;
