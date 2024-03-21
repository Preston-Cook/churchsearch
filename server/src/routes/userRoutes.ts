import { Router } from 'express';
import authController from '../controllers/authController';
import userController from '../controllers/userController';
import notAllowed from '../middleware/notAllowed';

const router: Router = Router();

router
  .route('/bookmark-church')
  .patch(authController.protect, userController.bookmarkChurch)
  .all(notAllowed);

router.route('/geolocate').get(userController.geolocate).all(notAllowed);

export default router;
