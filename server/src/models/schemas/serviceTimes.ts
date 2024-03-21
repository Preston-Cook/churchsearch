import { Schema } from 'mongoose';
import type {
  ServiceTimeModel,
  IServiceTime,
  IServiceTimeMethods,
} from '../..';
import { DAYS, SERVICE_CATEGORIES } from '../../config/constants';

const schema = new Schema<IServiceTime, ServiceTimeModel, IServiceTimeMethods>({
  day: {
    type: String,
    required: [true, 'Day Required'],
    enum: DAYS,
  },
  hour: {
    type: String,
    required: [true, 'Hour Required'],
  },
  minute: {
    type: String,
    required: [true, 'Minutes Required'],
  },
  category: {
    type: String,
    enum: SERVICE_CATEGORIES,
  },
});

// Determine category for service time
schema.pre('save', function (next) {
  const day = this.day;
  const hour = parseInt(this.hour);

  if (day === 'Sunday') {
    if (hour <= 9) {
      this.category = 'Early Sunday Morning';
    } else if (hour < 12) {
      this.category = 'Late Sunday Morning';
    } else {
      this.category = 'Sunday Afternoon';
    }
  } else {
    this.category = 'Saturday';
  }
  next();
});

export default schema;
