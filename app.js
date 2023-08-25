const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to DB');
});

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64e64769be5611f239841275',
  };

  next();
});

app.use(router);

app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Неправильный путь' });
  next();
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
