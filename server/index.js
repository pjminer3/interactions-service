const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');
const dotenv = require('dotenv');
const cassandra = require('cassandra-driver');

dotenv.config();

/*
----------- COMMAND USED TO CREATE KEYSPACE (DATABASE)
CREATE KEYSPACE pjm
  WITH REPLICATION = { 'class': 'SimplyStrategy', 'replication_factor': 3 }

----------- COMMAND USED TO CREATE TABLE (INTERACTIONS)
CREATE TABLE interactions (
  intr_id uuid,
  user_id int,
  tweet_id varchar,
  isAd boolean,
  friendly_intr boolean,
  intr_time timestamp,
  PRIMARY KEY (intr_id)
);

*/

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'pjm' });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// route to get the 20 most recent tweets from the specified user
app.get('/feed/:user_id', (req, res) => {
  res.send(`${Path.parse(req.path).base}`); 
});

// route to get a boolean from Aygerim's Social Graph Service
app.post('/user/friends', (req, res) => {
  res.send(true);
});

// route to post events to tweet database
app.post('/tweets/events', (req, res) => {
  res.send();
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}! Let's friggin do this!`));

module.exports = app;
