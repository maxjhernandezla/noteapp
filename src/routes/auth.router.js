import * as authController from '../controllers/auth.controller.js';
import { Router } from 'express';
import { isAuth } from '../middlewares/middlewares.js';
const router = Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

router.get('/logout', isAuth, authController.logOut);

export default router;
