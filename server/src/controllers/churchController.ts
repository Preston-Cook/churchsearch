import { type Request, type Response, type NextFunction } from 'express';
import Church from '../models/churchModel';
import catchAsync from '../utils/catchAsync';
import Testimonial from '../models/testimonialModel';
import AppError from '../utils/appError';
import minimumLevenshtein from '../utils/minimumLevenshtein';
import sendEmail from '../utils/sendEmail';

const getFeatured = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const featured = await Church.find({ featured: true }).select([
      'name',
      'city',
      'state',
      'images',
    ]);

    return res.status(200).json({
      status: 'success',
      data: featured,
    });
  }
);

const search = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { q, count } = req.query;

    let countNum = parseInt(count as string);

    if (typeof countNum !== 'number') {
      countNum = 0;
    }

    const churches = await Church.find();

    if (countNum > churches.length) {
      countNum = churches.length;
    }

    let query: string;

    if (!q) {
      query = '';
    } else {
      query = q as string;
    }

    const sortedChurches = churches
      .sort(
        (a, b) => minimumLevenshtein(a, query) - minimumLevenshtein(b, query)
      )
      .slice(countNum);

    res.status(200).json({
      status: 'success',
      data: sortedChurches,
    });
  }
);

const getChurches = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const churches = await Church.find({});

    res.status(200).json({
      status: 'success',
      data: churches,
    });
  }
);

const getChurch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      next(new AppError('Church ID Required', 400));
      return;
    }

    const church = await Church.findById(id).populate('testimonials');

    if (!church) {
      next(new AppError('Church Not Found', 404));
      return;
    }

    res.status(200).json({
      status: 'success',
      data: church,
    });
  }
);

const createChurch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pastorImage, churchImages } = req;

    if (!pastorImage && (!churchImages || churchImages.length === 0)) {
      next(new AppError('Pastor Image and Church Images Required', 400));
      return;
    }

    if (!pastorImage) {
      next(new AppError('Pastor Image Required', 400));
      return;
    }

    if (!churchImages || churchImages.length === 0) {
      next(new AppError('Church Images Required', 400));
      return;
    }

    const church = await Church.create({
      ...req.body,
      serviceTimes: JSON.parse(req.body.serviceTimes),
      pastorImage,
      images: churchImages,
    });

    return res.status(201).json({
      status: 'success',
      data: church,
    });
  }
);

const updateChurch = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pastorImage, churchImages } = req;
    const { id } = req.params;

    const body = req.body;

    if (pastorImage) {
      body.pastorImage = pastorImage;
    }

    if (churchImages?.length > 0) {
      body.images = churchImages;
    }

    body.serviceTimes = JSON.parse(body.serviceTimes);

    console.log(body);

    const church = await Church.findByIdAndUpdate(id, body);

    if (!church) {
      next(new AppError('Church Not Found', 404));
      return;
    }

    res.sendStatus(200);
  }
);

const createTestimonial = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const church = await Church.findById(id);

    if (!church) {
      next(new AppError('Church Not Found', 404));
      return;
    }

    const testimonial = await Testimonial.create({ ...req.body });

    church.testimonials.push(testimonial.id);
    await church.save();

    res.status(201).json({
      status: 'success',
      data: {
        testimonial,
      },
    });
  }
);

const updateTestimonials = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const church = await Church.findById(id).populate('testimonials');

    if (!church) {
      next(new AppError('Church Not Found', 404));
      return;
    }

    church.testimonials = [];

    (req.body as any[]).forEach(async testimonial => {
      let test;
      if (Object.hasOwn(testimonial, '_id')) {
        test = await Testimonial.findByIdAndUpdate(
          testimonial._id,
          testimonial
        );
        if (!test) {
          next(new AppError('Testimonial not Found', 404));
        }
      } else {
        const { name, denomination, worship, preaching, community } =
          testimonial;
        test = await Testimonial.create({
          name,
          denomination,
          worship,
          preaching,
          community,
        });
      }
      // @ts-ignore
      church.testimonials.push(test);
    });

    await church.save();

    res.sendStatus(200);
  }
);

const connect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { churchId } = req.body;

    if (!churchId) {
      next(new AppError('Church ID Required', 400));
      return;
    }

    const church = await Church.findById(churchId);

    if (!church) {
      next(new AppError('Church Not Found', 404));
      return;
    }

    const { userName, email } = req;

    if (church.contactType === 'known') {
      await sendEmail.churckKnownConnect(
        church.preferredContact,
        church.name,
        userName as string,
        email as string
      );
    }

    if (church.contactType === 'unknown') {
      await sendEmail.churchUnknownConnect(
        church.preferredContact,
        church.name,
        userName as string,
        email as string
      );
    }

    if (church.contactType === 'student') {
      await sendEmail.studentConnect(
        church.preferredContact,
        userName as string,
        email as string
      );
    }

    res.send(200);
  }
);

export default {
  connect,
  search,
  createTestimonial,
  updateTestimonials,
  updateChurch,
  createChurch,
  getChurch,
  getChurches,
  getFeatured,
};
