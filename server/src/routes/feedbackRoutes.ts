import { Router } from 'express';
import feedbackController from '../controllers/feedbackController';
import notAllowed from '../middleware/notAllowed';

const router: Router = Router();

router.route('/').post(feedbackController.createFeedback).all(notAllowed);

export default router;
