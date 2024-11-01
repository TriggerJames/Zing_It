import express from 'express';
import authRouter from './controllers/auth_controller.js';
import userRouter from './controllers/user_controller.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);



export default app;
