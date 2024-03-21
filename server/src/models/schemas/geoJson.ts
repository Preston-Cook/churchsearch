import { Schema } from 'mongoose';
import type { IGeoJson, GeoJsonModel, IGeoJsonMethods } from '../..';
import { STATES } from '../../config/constants';
import dotenv from 'dotenv-safe';
import AppError from '../../utils/appError';

// Configure environment
dotenv.config();

const schema = new Schema<IGeoJson, GeoJsonModel, IGeoJsonMethods>({
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
  },
  street: {
    type: String,
    required: [true, 'Street Required'],
  },
  city: {
    type: String,
    required: [true, 'City Required'],
  },
  state: {
    type: String,
    enum: STATES,
    required: [true, 'State Required'],
  },
  zip: {
    type: String,
    required: [true, 'Zip Code Required'],
  },
});

schema.pre('save', async function (next) {
  // Retrieve environment variables
  const API_ENDPOINT = process.env.GOOGLE_GEOCODING_ENDPOINT as string;
  const API_KEY = process.env.GOOGLE_GEOCODING_API as string;

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

    this.coordinates = [lng, lat];
    this.type = 'Point';
  } catch {
    next(new AppError('Something Went Wrong', 400));
  }
  next();
});

export default schema;
