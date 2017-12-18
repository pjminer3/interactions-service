const axios = require('axios');

const getFriendlyBoolean = require('./getFriendlyBoolean');
const getRandomUser = require('./getRandomUser');

const getFeed = () => {
  const user = getRandomUser();

  axios.get(`http://127.0.0.1:3000/feed/${user}`)
    .then((response) => {
      console.log('Successfuly got feed object: ', response.data);
      const { tweets } = response.data;
      const tweetCount = tweets.length;

      // recursive function to create calls to Aygerim's service
      function createRequests(tweets, idx = 0) {
        if (idx >= tweetCount) {
          return;
        }
        getFriendlyBoolean(response.data.user_id, tweets[idx].tweet_id, tweets[idx].isad);
        createRequests(tweets, idx + 1);
      }

      // call to create all requests to aygerim's service
      createRequests(tweets);
    })
    .catch((err) => {
      console.log('There was an error in GETting the feed object');
      console.log(err);
    });
};

module.exports = getFeed;

// TODO: modularize helper functions
// TODO: use map to create the requests instead of idx 
// create a promise.all for the mapped requests
