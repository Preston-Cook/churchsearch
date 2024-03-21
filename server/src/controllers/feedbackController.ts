import type { Request, Response, NextFunction } from 'express';
import Feedback from '../models/feedbackModel';
import catchAsync from '../utils/catchAsync';
import sendEmail from '../utils/sendEmail';

const createFeedback = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const {
      email,
      navigation,
      filters,
      testimonials,
      recommendations,
      feedback,
    } = req.body;

    const feedbackDoc = await Feedback.create({
      email,
      navigation,
      filters,
      testimonials,
      recommendations,
      feedback,
    });

    await sendEmail.websiteFeedback(
      email,
      navigation,
      filters,
      testimonials,
      recommendations,
      feedback
    );

    res.status(201).json({
      status: 'success',
      data: feedbackDoc,
    });
  }
);

export default {
  createFeedback,
};
