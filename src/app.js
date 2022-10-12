import express from 'express'
import errorHandler from './middleware/errorHandler';
import authRouter from './modules/Auth/router';
import productRouter from './modules/Products/router';
import userRouter from './modules/Users/router';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.use(errorHandler);

export default app;