const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', require('./routes/api'));
app.use('/api-docs', require('./routes/docs'));

const { sequelize } = require("./models");
sequelize.sync();

module.exports = app;