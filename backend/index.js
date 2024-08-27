const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectToMongoDB = require('./connection');
const taskRouter = require('./routes/task');
const userRouter = require('./routes/user');


//connection
connectToMongoDB(process.env.MONGO_URL);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


//routing
app.use('/',taskRouter);
app.use('/user',userRouter);


//listening
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
