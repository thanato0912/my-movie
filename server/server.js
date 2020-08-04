const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const userRouter = require('./routes/users.route');
const favoriteRouter = require('./routes/favorites.route');
//const config = require('./config/key');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/favorites', favoriteRouter);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

  app.use((req, res, next) => {
    const error = new Error('Not Found'); //Error object
    error.status = 404;

    //res.render('./404'); by default in express applications you would render a 404 page

    res
      .status(200)
      .sendFile(path.join(__dirname, '../client/build/index.html'));

    next(error);
  });
}

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB CONNECTED.'))
  .catch((err) => console.error(err));

app.listen(port, () => console.log(`Running on port ${port}`));
