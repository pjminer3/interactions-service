const { client } = require('./../../database/index'); // THIS CLIENT WILL EVENTUALLY NEED TO LEAD TO MY EC2 INSTANCE

const { generateIntrID, generateTimestamp } = require('./../helperFunctions/dataGeneration');

// function to add a new record to the cassandra DB using once provided with a:
// userID, tweetID, isAd boolean, and friendly boolean
const addIntsToDB2 = (userId, tweetId, isAd, friendly) => {
  const intrId = generateIntrID();
  const intrTime = generateTimestamp();

  const query = 'INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [intrId, userId, tweetId, isAd, friendly, intrTime];

  return client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log('Row updated in cassandra');
    })
    .catch((err) => {
      console.log('Error with adding record to DB: ', err);
    });
};

module.exports = addIntsToDB2;

