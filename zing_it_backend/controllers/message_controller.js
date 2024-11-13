import { Router } from 'express';
import Chat from './../models/chat.js';
import Message from './../models/messages.js';
import authMiddleware from './../middlewares/authMiddleware.js';

const messageRouter = Router();

messageRouter.post('/send-message', authMiddleware, async (req, res) => {
  const { chatRoom, sender, text } = req.body;

  try {
    const message = new Message({ chatRoom, sender, text });
    await message.save();

    // Update lastMessage in chat
    await Chat.findByIdAndUpdate(chatRoom, { lastMessage: message.id });

    res.status(201).send({
      message: 'Message sent successfully',
      success: true,
      data: message,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// Get All Messages in a Chat Room
messageRouter.get('/get-all-messages/:chatRoomId', authMiddleware, async (res, req) => {
  const { chatRoomId } = req.params;

  try {
    const messages = await Message.find({ chatRoom: chatRoomId })
    .populate('sender', 'firstName lastName')
    .sort({ timestamp: 1 });

    res.status(200).send({
      message: 'Message retrieved successfully',
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default messageRouter;
