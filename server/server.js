const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/users.route');
const favoriteRouter = require('./routes/favorites.route');
const config = require('./config/key');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://my-movie-by-sssaang.herokuapp.com',
    ],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/favorites', favoriteRouter);

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB CONNECTED.'))
  .catch((err) => console.error(err));

app.listen(port, () => console.log(`Running on port ${port}`));
