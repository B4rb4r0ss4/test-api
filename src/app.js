const express = require('express');
const testRouter = require('./routers/tests');
const path = require('path');
require('./db/mongoose');

const publicDirectoryPath = path.join(__dirname, '../public');
const app = express();
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(testRouter);
module.exports = app;
