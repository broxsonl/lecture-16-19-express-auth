'use strict';

// npm modules
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const debug = require('debug')('leegram:server');

// app modules
const errorMiddleware = require('./lib/error-middleware');
const authRouter = require('./route/auth-router');

// load env vars
dotenv.load();

// setup mongoose
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

//module constants
const PORT = process.env.PORT;
const app = express();

// app middleware
app.use(cors());
app.use(morgan('dev'));

// app routes
app.use(authRouter);
app.use(errorMiddleware);

// start server
const server = module.exports = app.listen(PORT, function() {
  debug(`server started on ${PORT}`);
});

server.isRunning = true;
