import express from 'express';
import authRouter from './controllers/auth_controller.js';
import userRouter from './controllers/user_controller.js';
import chatRouter from './controllers/chat_controller.js';
import messageRouter from './controllers/message_controller.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

export default app;
