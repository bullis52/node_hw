const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('./config/mongoConnect');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// eslint-disable-next-line no-unused-vars
app.use('*', (e, req, res, next) => {
    res
        .status(e.status)
        .json({
            msg: e.message
        });
});

const {authRouter, userRouter} = require('./routes/index');

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(config.PORT, () => {
    console.log(`app listen = ${config.PORT}`);
});
