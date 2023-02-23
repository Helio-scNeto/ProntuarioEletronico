import { Router } from 'express';
import UserLoginController from '../controllers/UserLoginController';

const loginRouter = Router();

loginRouter.post('/login', UserLoginController.Login);

export { loginRouter };
