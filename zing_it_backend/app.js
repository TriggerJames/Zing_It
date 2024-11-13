import express from 'express';
import authRouter from './controllers/auth_controller.js';
import userRouter from './controllers/user_controller.js';
import chatRouter from './controllers/chat_controller.js';
import messageRouter from './controllers/message_controller.js';
import cors from 'cors';

const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

// Centralize Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An error occurred',
    success: false,
    error: err.message,
  });
});

export default app;
