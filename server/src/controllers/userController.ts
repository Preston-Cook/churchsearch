import type { Request, Response, NextFunction } from 'express';
import Church from '../models/churchModel';
import User from '../models/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import dotenv from 'dotenv-safe';

dotenv.config();

const IP_INFO_API_ENDPOINT = process.env.IP_INFO_API_ENDPOINT as string;
const IP_INFO_ACCESS_TOKEN = process.env.IP_INFO_ACCESS_TOKEN as string;

const bookmarkChurch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { churchId } = req.body;

    if (!churchId) {
      next(new AppError('Church ID Required', 400));
      return;
    }

    const church = await Church.findById(churchId);

    if (!church) {
      next(new AppError('Invalid Church ID', 400));
      return;
    }

    // Get current user
    const user = await User.findById(req.userId);

    if (!user) {
      next(new AppError('Invalid Refresh Token', 401));
      return;
    }

    user.bookmarkedChurches.push(church.id);
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Church Bookmarked',
    });
  }
);

const geolocate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ip =
      req.headers['cf-connecting-ip'] ??
      req.headers['x-real-ip'] ??
      req.headers['x-forwarded-for'] ??
      req.socket.remoteAddress ??
      '';

    let lat, lng;
    try {
      const resp = await fetch(
        `${IP_INFO_API_ENDPOINT}/${ip as string}?token=${IP_INFO_ACCESS_TOKEN}`
      );
      const data = await resp.json();

      [lat, lng] = data.loc.split(',');
    } catch (err) {
      lat = 30.284918;
      lng = -97.734057;
    }

    res.status(200).json({
      status: 'success',
      data: {
        lat: Number(lat),
        lng: Number(lng),
      },
    });
  }
);

export default {
  geolocate,
  bookmarkChurch,
};
