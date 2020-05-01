require('dotenv').config();
const { DEV_SECRET } = require('./constants');

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/diplomweb';
const isProduction = process.env.NODE_ENV === 'production';
const corsOptions = {
  origin: '*',
  methods: 'GET, POST OPTIONS, DELETE, HEAD',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET: isProduction ? process.env.JWT_SECRET : DEV_SECRET,
  corsOptions,
};
