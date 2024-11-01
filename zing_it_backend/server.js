import dotenv from 'dotenv';
dotenv.config({path: './config.env'});

import express from 'express';
import app from './app.js';
import db from './config/config.js';

const port = process.env.PORT_NUMBER;

app.listen(port, () => {
  console.log(`listening on PORT: ${port}`);
});
