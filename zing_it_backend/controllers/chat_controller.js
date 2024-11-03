import { Router } from 'express';
import authMiddleware from './../middlewares/authMiddleware.js';
import Chat from './../models/chat.js';

const chatRouter = Router();

chatRouter.post('/create-new-chat', authMiddleware, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();

    res.status(201).send({
      message: 'Chat created successfully',
      success: true,
      data: savedChat,
    });
  } catch(error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

chatRouter.get('/get-all-chats', authMiddleware, async (req, res) => {
  try {
    const allChats = await Chat.find({members: {$in: req.body.userId}});
    res.status(201).send({
      message: 'Chat fetched successfully',
      success: true,
      data: allChats
    });
  } catch(error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

export default chatRouter;
