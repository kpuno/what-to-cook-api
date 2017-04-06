// Main starting point of application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const favicon = require('serve-favicon');

// DB Setup
mongoose.connect(process.env.URI || 'mongodb://user:12345@ds141950.mlab.com:41950/what-to-cook');

// favicon
app.use(favicon(__dirname + '/favicon.ico'));

// DB Setup
// 'mongodb://user:12345@ds141950.mlab.com:41950/what-to-cook'
// mongoose.connect(process.env.URI || 'mongodb://user:12345@ds141950.mlab.com:41950/what-to-cook');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);