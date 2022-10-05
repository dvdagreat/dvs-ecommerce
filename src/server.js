import * as dotenv from 'dotenv'

import app from './app';

dotenv.config()

const PORT = process.env.APP_POST || 3000;

app.listen(PORT, () => {
    console.log(`app started at port ${PORT}`);
});