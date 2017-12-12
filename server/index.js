const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route to get the 20 most recent tweets from the specified user
app.get('/feed/:user_id', (req, res) => {
  res.send(`${Path.parse(req.path).base}`); // <------------ Why is this not in the res.body?
});

// route to get a boolean from Aygerim's Social Graph Service
app.post('/user/friends', (req, res) => {
  res.send(true);
});

// route to post events to tweet database
app.post('/tweets/events', (req, res) => {
  res.send();
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
