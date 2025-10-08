import 'dotenv/config';
import express from 'express';
import userRouter from './routes/user.router.js';
import employeeRouter from './routes/employee.routes.js';
import { connectDatabase } from './db.js';

const app=express()
//parse incoming json requests
app.use(express.json())
//user routes:
app.use('/api/v1/user', userRouter);
//employee routes:
app.use('/api/v1/emp', employeeRouter);

//server port from environmental variable or 3000
const SERVER_PORT = process.env.PORT || 3000;

async function start() {
  try {
    //connect to db
    await connectDatabase(process.env.MONGODB_URI);
    app.listen(SERVER_PORT, () => {
      console.log(`Server running at http://localhost:${SERVER_PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err?.message || err);
    process.exit(1);
  }
};
//initialize the app

start();

