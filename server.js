const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./routes');
const path = require('path');

require('dotenv').config();

const app = express();

const {
  NODE_ENV: nodeEnv,
  PROD_DATABASE_URL: prodDatabaseUrl,
  DEV_DATABASE_URL: devDatabaseUrl
} = process.env;

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use('/api', routerApi);

if (nodeEnv === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const databaseUrl = nodeEnv === 'production' ? prodDatabaseUrl : devDatabaseUrl;

mongoose.connect(databaseUrl, {
  dbName: 'portfolio',
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Successfully connected to database.');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
