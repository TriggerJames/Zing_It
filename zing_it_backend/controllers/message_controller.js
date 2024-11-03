import { Router } from 'express';
import authMiddleware from './../middlewares/authMiddleware.js';
import Chat from './../models/chat.js';
import Message from './../models/message.js';

const messageRouter = Router();

messageRouter.post('/new-message', authMiddleware, async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    const currentChat = await Chat.findOneAndUpdate({
      _id: req.body.chatId
    }, {
        lastMessage: savedMessage._id,
        $inc: {unreadMessageCount: 1}
    });

    res.status(201).send({
      message: 'Message sent successfully',
      success: true,
      data: savedMessage
    });
  } catch(error) {
    res.satus(400).send({
      message: error.message,
      success: false
    });
  }
});

messageRouter.get('/get-all-messages/:chatId', authMiddleware, async (req, res) => {
  try {
    const allMessages = await Message.find({chatId:
        req.params.chatId}).sort({createdAt: 1});
    res.status(200).send({
      message: 'Messages fetched successfully',
      success: true,
      data: allMessages
    });
  } catch {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

export default messageRouter;
