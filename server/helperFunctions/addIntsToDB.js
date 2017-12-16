import cassandra from 'cassandra-driver';
import uuidv4 from 'uuid/v4';

import { client } from './../index';

/*
----------- COMMAND USED TO INSERT RECORD
INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time)
  VALUES (**uuid**, **int**, **text**, **boolean**, **boolean**, **timestamp**)

*/

function generateIntrID() {
  return uuidv4();
}

// generate random timestamp
function generateTimestamp() {
  const currentTime = 1513196237428;
  const threeMonths = 7776000000;
  return currentTime + Math.round(Math.random() * threeMonths);
}


const addIntsToDB = (userId, tweetId, isAd, friendly) => {
  const intrId = generateIntrID();
  const intrTime = generateTimestamp();

  const query = 'INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time) VALUES (?, ?, ?, ?, ?, ?)'; 
  const params = [intrId, userId, tweetId, isAd, friendly, intrTime];

  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log('Row updated: ', result);
    });
};

export default addIntsToDB;

