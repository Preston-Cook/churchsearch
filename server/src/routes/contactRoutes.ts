import { Router } from 'express';
import contactController from '../controllers/contactController';
import notAllowed from '../middleware/notAllowed';

const router: Router = Router();

router.route('/').post(contactController.createContact).all(notAllowed);

router
  .route('/add-church')
  .post(contactController.createAddChurch)
  .all(notAllowed);

export default router;
