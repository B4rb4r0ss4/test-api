const express = require('express');
const testRouter = require('./routers/tests');
const path = require('path');
require('./db/mongoose');

const publicDirectoryPath = path.join(__dirname, '../dist');
const app = express();
app.use(express.static(publicDirectoryPath));

app.get('/test', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'quiz.html'));
});
app.use(express.json());
app.use(testRouter);
module.exports = app;
