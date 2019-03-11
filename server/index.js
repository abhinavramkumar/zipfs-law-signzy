const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const API = require('./api');
const publicPath = path.join(__dirname, '..', 'public');

const normalizePort = PORT => parseInt(PORT, 10);

const PORT = normalizePort(process.env.PORT) || 9000;

const App = express();

App.use(express.static(publicPath));
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());
App.use(morgan('tiny'));
App.use('/api', API);

App.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

App.listen(PORT, () => {
  console.log(`Express Server Running...`);
});
