'use strict';
import { Sequelize } from 'sequelize';
import { readFile } from 'fs/promises';

const config = JSON.parse(await readFile("config/config.json", "utf8"))['development'];
const sequelize = new Sequelize(config);

export { Sequelize, sequelize };