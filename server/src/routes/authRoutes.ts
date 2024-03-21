import { Router } from 'express';
import authController from '../controllers/authController';
import notAllowed from '../middleware/notAllowed';

const router: Router = Router();

router.route('/log-in').post(authController.logIn).all(notAllowed);

router.route('/sign-up').post(authController.signUp).all(notAllowed);

router
  .route('/log-out')
  .get(authController.protect, authController.logOut)
  .all(notAllowed);

router.route('/refresh').get(authController.refresh).all(notAllowed);

router
  .route('/forgot-password')
  .post(authController.forgotPassword)
  .all(notAllowed);

router
  .route('/reset-password/:id')
  .post(authController.resetPassword)
  .all(notAllowed);

export default router;
