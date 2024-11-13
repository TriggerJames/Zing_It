import { Router } from 'express';
import Chat from './../models/chat.js';
import authMiddleware from './../middlewares/authMiddleware.js';

const chatRouter = Router();

// Start a New Chat (Private or Group)
chatRouter.post('/start-chat', authMiddleware, async (req, res) => {
  const { type, members, groupName } = req.body;

  try {
    if (type === 'private') {
    // Check if the private chat  already exit between members
      const existingChat = await Chat.findOne({
        type: 'private',
        members: { $size: members.length, $all: members },
      });

      if (existingChat) {
        return res.status(200).send({
          message: 'Chat already exits',
          success: true,
          data: existingChat,
        });
      }
    }
    // Create a new chat (private or group)
    const chat = new Chat({ type, members, groupName });
    await chat.save();

    res.status(201).send({
      message: 'New chat created succefully',
      success: true,
      data: chat,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// Get All Chat for a User
chatRouter.get('/get-user-chat', authMiddleware, async (req, res) => {
  const userId = req.body.userId;

  try {
    const chats = await Chat.find({ members: userId })
    .populate('members', 'firstName lastname')
    .populate('lastMessage');

    res.status(200).send({
      message: 'User messages retrieved successfully',
      success: true,
      data: chats,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default chatRouter;
