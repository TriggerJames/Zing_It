import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './../models/users.js';

const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
 //check if user already exit
 try {
   const user = await User.findOne({email: req.body.email});
   if (user) {
     return res.status(400).send({
       message: 'User already exist.',
       success: false,
     });
   }

   //Password encryption
   const hashedPasswd = await bcrypt.hash(req.body.password, 10);
   req.body.password = hashedPasswd;

   //Create new user, save in DB
   const newUser = new User(req.body);
   await newUser.save();

   res.status(201).send({
     message: 'User created successfully!',
     success: true,
   });

 } catch(error) {
   res.send({
     message: error.message,
     success: false,
   });
 };
});

authRouter.post('/login', async (req, res) => {
  try {
    //check if user exits
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(404).send({
        message: 'User does not Exit',
        success: false
      });
    }
    //check if password is correct with users own in the database
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(404).send({
        message: 'invalid password',
        success: false
      });
    }
    //authenticate with jwt
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '1d'});

    res.status(201).send({
      message: 'user logged-in successfully',
      success: true,
      token: token
    });

  } catch(error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default authRouter;
