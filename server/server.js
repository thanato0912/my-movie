const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/key');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const userRouter = require('./routes/users.route');
const favoriteRouter = require('./routes/favorites.route');


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/users', userRouter);
app.use('/favorites', favoriteRouter);

mongoose.connect(config.mongoURI, {useNewUrlParser: true,  useUnifiedTopology: true})
        .then(() => console.log('DB CONNECTED.'))
        .catch(err => console.error(err));







app.listen(port, () => console.log(`Running on port ${port}` ));
