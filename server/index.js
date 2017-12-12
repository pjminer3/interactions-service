const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
