const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

//helps express to access the incoming requests in json format
app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

module.exports = app
