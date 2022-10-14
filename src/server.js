import * as dotenv from 'dotenv'
import sequelize from './database/db';

import app from './app';

dotenv.config()
const PORT = process.env.APP_POST || 3000;

app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`app started at port ${PORT}`);
});