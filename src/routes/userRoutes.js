import express from 'express';
import { loginUser, updateProgress } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/update', updateProgress);

export default userRouter;