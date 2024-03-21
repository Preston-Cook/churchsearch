import { Router } from 'express';
import notAllowed from '../middleware/notAllowed';
import churchController from '../controllers/churchController';
import upload from '../middleware/upload';
import authController from '../controllers/authController';

const router: Router = Router();

router.route('/featured').get(churchController.getFeatured).all(notAllowed);

router.route('/search').get(churchController.search).all(notAllowed);

router
  .route('/connect')
  .post(authController.protect, churchController.connect)
  .all(notAllowed);

router
  .route('/')
  .get(churchController.getChurches)
  .post(
    upload.fields([
      { name: 'pastorImage', maxCount: 1 },
      { name: 'churchImages', maxCount: 5 },
    ]),
    churchController.createChurch
  )
  .all(notAllowed);

router
  .route('/:id')
  .get(churchController.getChurch)
  .put(
    upload.fields([
      { name: 'pastorImage', maxCount: 1 },
      { name: 'churchImages', maxCount: 5 },
    ]),
    churchController.updateChurch
  )
  .all(notAllowed);

router
  .route('/:id/testimonials')
  .post(churchController.createTestimonial)
  .put(churchController.updateTestimonials)
  .all(notAllowed);

export default router;
