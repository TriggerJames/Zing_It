import dotenv from 'dotenv';
dotenv.config({path: './config.env'});

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import db from './config/config.js';

const port = process.env.PORT_NUMBER;

// HTTP server with Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
  }
});

//Share io instance with app for access in route
app.set('io', io);

io.on('connection', (socket) => {
  console.log(`User connected to ${socket.id}`);

  //Join a chat room group or private)
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  //Listen for message from a client
  socket.on('chatMessage', async ({ roomId, senderId, message }) => {
    const newMessage = new Message({ chatRoom: roomId, sender: senderId, text: message });
    await newMessage.save();

    io.to(roomId).emit('message', {
      roomId,
      senderId,
      message,
      timestamp: new Date(),
    });
  });

  //Handle user disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(port, () => {
  console.log(`listening on PORT: ${port}`);
});
