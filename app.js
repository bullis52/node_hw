const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/mongoConnect');

const app = express();

mongoose.connect(config.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./routes/user.route');

app.use('/users', userRouter);

app.listen(5001, () => {
    console.log(`app listen ${config.PORT}`);
});
