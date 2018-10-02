//
// Entry point for the application
//

// Node/Express imports
const config = require('./config');
const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const port =  config.port || 3000;
const api = require('./backend/routes');

// DB Connection
mongoose.connect(config.db_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Route creation
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

// Hosting
app.listen(port, err => {
  err ? console.error(err) : console.info(`Dragons are on port ${port}`);
});

module.exports = app;
