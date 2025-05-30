const express = require('express');
dotenv = require('dotenv').config();
const connectDB = require('./db/mongodb');
const userRouter = require('./routes/userRoutes');
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);


const port = process.env.PORT;


app.listen(port, console.log(`Server is running on port ${port}`));
