const express = require('express');
const testRouter = require('./routers/tests');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(testRouter);

module.exports = app;
