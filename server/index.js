const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');
const dotenv = require('dotenv');
const cassandra = require('cassandra-driver');

// data generation
const uuidv4 = require('uuid/v4');
const randomstring = require('randomstring');

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

----------- COMMAND USED TO INSERT RECORD
INSERT INTO interactions (intr_id, user_id, tweet_id, isAd, friendly_intr, intr_time)
  VALUES (**uuid**, **int**, **text**, **boolean**, **boolean**, **timestamp**)

*/

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'pjm' });

// generate data here


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


// generate random intr_id (uuid)
function generateIntrID() {
  return uuidv4();
}

// generate random user_id (int)
function generateUserID() {
  return Math.round(Math.random() * 9999999999);
}

// genereate tweet_id (string)
function generateTweetID() {
  return randomstring(15);
}

// generate boolean
function generateBoolean() {
  return !!Math.round(Math.random());
}

// generate random timestamp
function generateTimestamp() {
  let currentTime = 1513196237428;
  let threeMonths = 7776000000;
  return currentTime + Math.round(Math.random() * threeMonths);
}

function createSingleInsert() {
  return {
    query: 'INSERT INTO interactions (intr_id, user_id, tweet_id, isAd, friendly_intr, intr_time) VALUES (?, ?, ?, ?, ?, ?)',
    params: [ 
      generateIntrID(), // intr_id
      generateUserID(), // user_id
      generateTweetID(), // tweet_id
      generateBoolean(), // isAd
      generateBoolean(), // friendly_intr
      generateTimestamp(), // intr_time
    ],
  };
}

function createBatchInsert() {
  const queries = [];

  for (let i = 0; i < 50; i++) {
    queries.push(createSingleInsert());
  }

  return queries;
}

function createOneMillionEntries() {
  for (let i = 0; i < 20000; i++) {
    client.batch(createBatchInsert(), { prepare: true })
      .then((result) => {
        console.log('Batch created');
      });
  }
}

// createOneMillionEntries();


module.exports = app;
