import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';
import User from '../models/userModel';
import dotenv from 'dotenv-safe';
import catchAsync from '../utils/catchAsync';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN as string;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN as string;
const PASSWORD_RESET_TOKEN_EXPIRES_IN = process.env
  .PASSWORD_RESET_TOKEN_EXPIRES_IN as string;

const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { first, last, email, password } = req.body;

    // Error handling for required fields
    if (!email || !password) {
      next(new AppError('Email and Password Required', 400));
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (user) {
      next(new AppError('Account Already Exists', 400));
      return;
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      first,
      last,
      email,
      password: hash,
      roles: ['user'],
    });

    // Create refresh token
    const refreshToken = jwt.sign({ id: newUser.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    // Store refresh token in database
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Create Access Token
    const accessToken = jwt.sign({ id: newUser.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    // Set refresh token as cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    await sendEmail.signUp(first, email);

    res.status(201).json({
      status: 'success',
      id: newUser.id,
      roles: newUser.roles,
      accessToken,
    });
  }
);

const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    // Validate req body
    if (!email || !password) {
      next(new AppError('Email and Password Required', 400));
    }

    // Query database for user
    const user = await User.findOne({ email }).select('+password');

    // User not matched by query
    if (!user) {
      next(new AppError('Incorrect Email', 400));
      return;
    }

    // Check if password is correct
    if (!(await user.correctPassword(password))) {
      next(new AppError('Incorrect Password', 400));
      return;
    }

    // Generate Refresh Token
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    // Store refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    // Generate Access Token
    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    // Set refresh token as cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    // Return good response to client
    res.status(200).json({
      id: user.id,
      email,
      roles: user.roles,
      first: user.first,
      last: user.last,
      accessToken,
    });
  }
);

const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findById(req.userId);

    // Delete refresh token if exists in database
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }

    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res
      .status(200)
      .json({ status: 'success', message: 'Successfully logged out' });
  }
);

const refresh = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      next(new AppError('No Refresh Token', 401));
      return;
    }

    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });

    if (!user) {
      next(new AppError('Invalid Refresh Token', 401));
      return;
    }

    const decoded: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (!decoded.id) {
      next(new AppError('Invalid Refresh Token Payload', 403));
      return;
    }

    if (user.id !== decoded.id) {
      next(new AppError('Invalid Refresh Token', 403));
      return;
    }

    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    res.status(200).json({
      status: 'success',
      accessToken,
    });
  }
);

const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      next(new AppError('No Access Token', 401));
      return;
    }
    const token = authHeader.split(' ')[1];

    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const { id } = decoded;

    if (!decoded.id) {
      next(new AppError('Invalid Access Token Payload', 403));
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      next(new AppError('Invalid Access Token', 401));
      return;
    }

    req.userId = id;
    req.email = user.email;
    req.roles = user.roles;
    req.userName = `${user.first} ${user.last}`;
    next();
  }
);

const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      next(new AppError('Email Required', 400));
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      next(new AppError('Account Does Not Exist', 400));
      return;
    }

    const { id } = user;

    // password reset token
    const passwordResetToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
      expiresIn: PASSWORD_RESET_TOKEN_EXPIRES_IN,
    });

    user.passwordResetToken = passwordResetToken;
    const passwordRouteParameter = crypto.randomBytes(20).toString('hex');

    user.passwordRouteParameter = passwordRouteParameter;
    await user.save();

    await sendEmail.passwordReset(email, passwordRouteParameter);

    res.status(201).json({
      status: 'success',
    });
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findOne({ passwordRouteParameter: id });

    if (!user) {
      next(new AppError('Invalid Reset Link', 400));
      return;
    }

    const resetToken = user.passwordResetToken as string;
    const decoded: any = jwt.verify(resetToken, REFRESH_TOKEN_SECRET);

    if (decoded.id !== user.id) {
      next(new AppError('Invalid Reset Token', 400));
      return;
    }

    // Generate Refresh Token
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    const { password } = req.body;

    // Store refresh token in database
    user.password = await bcrypt.hash(password, 10);
    user.refreshToken = refreshToken;
    user.passwordResetToken = undefined;
    user.passwordRouteParameter = undefined;
    await user.save();

    // Generate Access Token
    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    // Set refresh token as cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.status(200).json({
      accessToken,
      roles: user.roles,
      email: user.email,
      first: user.first,
      last: user.last,
    });
  }
);

export default {
  signUp,
  logIn,
  logOut,
  refresh,
  protect,
  forgotPassword,
  resetPassword,
};
