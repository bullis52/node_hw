const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/mongoConnect');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {authRouter, userRouter} = require('./routes/index');

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(config.PORT, () => {
    console.log(`app listen = ${config.PORT}`);
});
