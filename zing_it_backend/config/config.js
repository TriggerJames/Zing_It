import dotenv from 'dotenv';
dotenv.config({path: './config.env'});


import mongoose from 'mongoose'

mongoose.connect(process.env.CONNECTION_STR);
//mongoose.connect('mongodb+srv://mwunnam:TTNNpkxrf9t5DJkj@cluster0.slavg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('connected', () => {
  console.log('DB is connected');
});

db.on('error', () => {
  console.log('DB connection failed');
});

export default db;
