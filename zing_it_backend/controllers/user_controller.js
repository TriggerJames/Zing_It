import { Router } from 'express';
import User from './../models/users.js';
import authMiddleware from './../middlewares/authMiddleware.js'


const userRouter = Router();

//Get the details of the currenly login user
userRouter.get('/get-logged-user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId});

    res.send({
      message: 'user fetched successfully',
      success: true,
      data: user
    });
  } catch(error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

userRouter.get('/get-all-users', authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const allUsers = await User.find({_id: {$ne: userId}})

    res.send({
      message: 'All user fectched successfully',
      success: true,
      data: allUsers,
    });
  } catch(error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default userRouter;
