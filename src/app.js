import express from 'express'
import errorHandler from './middleware/errorHandler';
import userRouter from './modules/Users/router';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.use(errorHandler);

export default app;