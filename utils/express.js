const express = require('express');
const app = express();
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const expressPino = require('express-pino-logger');

require('dotenv').config();

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(compress());

app.use(helmet());

app.use(cors());

app.use(expressPino());

module.exports = app;
