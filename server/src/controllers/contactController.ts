import type { Request, Response, NextFunction } from 'express';
import Contact from '../models/contactModel';
import catchAsync from '../utils/catchAsync';
import AddChurch from '../models/addChurchModel';
import sendEmail from '../utils/sendEmail';

const createAddChurch = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { name, email, church, message } = req.body;

    const addChurch = await AddChurch.create({ name, email, church, message });

    await sendEmail.addChurchRequest(name, email, church, message);

    res.status(201).json({
      status: 'success',
      data: addChurch,
    });
  }
);

const createContact = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { name, email, company, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      company,
      subject,
      message,
    });

    await sendEmail.contactRequest(name, email, subject, message);

    res.status(201).json({
      status: 'success',
      data: contact,
    });
  }
);

export default {
  createAddChurch,
  createContact,
};
