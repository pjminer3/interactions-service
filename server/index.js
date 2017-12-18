// setup newrelic 
const nr = require('newrelic');

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cassandra = require('cassandra-driver');

const dataGeneration = require('./helperFunctions/dataGeneration');

const getFeed = require('./helperFunctions/getFeed');


// --------- SETTING UP AND EXPORTING DATABASE REQUIRED UP HERE ----------
const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'pjm' });

client.connect((err) => {
  if (err) {
    console.log('There was an error connecting to database');
  } else {
    console.log('Successfully connected to database');
  }
});

module.exports.client = client;
//------------------------------------------------------------------------

dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------- the below endpoints are for testing purposes only -----------------------

app.post('/tweets/events', (request, response) => {
  console.log('Post to tweets successful');
  response.json();
});

app.get('/user', (request, response) => {
  console.log('Get to /user successful');
  response.json(!!Math.round(Math.random()));
});

app.get('/feed/:userId', (request, response) => {
  response.json({
    user_id: request.params.userId,
    tweets: [
      { tweet_id: 1, isad: false },
      { tweet_id: 2, isad: true },
      { tweet_id: 3, isad: true },
      { tweet_id: 4, isad: false },
      { tweet_id: 5, isad: false },
    ],
  });
});


app.post('/testinput', (request, response) => {
  const query = 'INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time) VALUES (?, ?, ?, ?, ?, ?)';

  const intrId = dataGeneration.generateIntrID();
  const userId = 2342432;
  const tweetId = '723947';
  const isAd = true;
  const friendly = false;
  const intrTime = '2018-01-17 13:09:01.969000+0000';

  const params = [intrId, userId, tweetId, isAd, friendly, intrTime];

  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log('Row updated in cassandra');
      response.json();
    })
    .catch((err) => {
      console.log('Error with adding record to DB: ', err);
      response.json();
    });
});

// -------------------------- END OF TESTING PORTION CODE -----------------------------------------

app.listen(PORT, () => console.log(`Listening on port ${PORT}! Let's friggin do this!`));

module.exports.app = app;


/* -------------------- DATA GENERATION BELOW ---------------------- */
/*
----------- COMMAND USED TO CREATE KEYSPACE (DATABASE)
CREATE KEYSPACE pjm
  WITH REPLICATION = { 'class': 'SimplyStrategy', 'replication_factor': 3 }

----------- COMMAND USED TO CREATE TABLE (INTERACTIONS)
CREATE TABLE interactions (
  intr_id uuid,
  user_id int,
  tweet_id varchar,
  isad boolean,
  friendly_intr boolean,
  intr_time timestamp,
  PRIMARY KEY (intr_id)s
);

----------- COMMAND USED TO INSERT RECORD
INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time)
  VALUES (**uuid**, **int**, **text**, **boolean**, **boolean**, **timestamp**)

*/

// function createSingleInsert() {
//   const intr_id = dataGeneration.generateIntrID(); // random interaction
//   const user_id = dataGeneration.generateUserID();
//   const tweet_id = dataGeneration.generateTweetID();
//   const isad = dataGeneration.tweetIsAd();
//   const friend_intr = dataGeneration.friendlyInter(isad);
//   const time = dataGeneration.generateTimestamp();

//   return {
//     query: 'INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time) VALUES (?, ?, ?, ?, ?, ?)',
//     params: [
//       intr_id, // intr_id
//       user_id, // user_id
//       tweet_id, // tweet_id
//       isad, // isAd
//       friend_intr, // friendly_intr
//       time, // intr_time
//     ],
//   };
// }

// let batchNumber = 1

// function createBatchInsert() {
//   console.log('Data records: ', batchNumber * 50);
//   batchNumber += 1;

//   const queries = [];

//   for (let i = 0; i < 50; i++) {
//     queries.push(createSingleInsert());
//   }

//   return queries;
// }

// function createOneMillionEntries(int = 0) {
//   if (int === 200000) {
//     console.log('Creation complete');
//     return;
//   }
//   client.batch(createBatchInsert(), { prepare: true })
//     .then(() => {
//       createOneMillionEntries(int + 1);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// // // // // // uncomment the below line to generate the data
// createOneMillionEntries(0);

// setInterval(getFeed, 5000);
