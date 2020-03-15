const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./routes');
require('dotenv/config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routerApi);

mongoose.connect(
  process.env.DATABASE_URL,
  {
    dbName: 'portfolio',
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Successfully connected to database.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
