const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 5000;

//helps express to access the incoming requests in json format
app.use(express.json())

app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log("Server is on the port ",port);
});