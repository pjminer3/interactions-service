const axios = require('axios');

const getFriendlyBoolean = require('./getFriendlyBoolean');

const getFeed = () => {
  // generate random user to login
  function getRandomUser() {
    return Math.round(Math.random() * 10000000);
  };

  const user = 666; // getRandomUser();

  axios.get(`http://127.0.0.1:3000/feed/${user}`)
    .then((response) => {
      console.log('Successfuly got feed object: ', response.data);
      const { tweets } = response.data;
      const tweetCount = tweets.length;

      function createRequests(tweets, idx = 0) {
        if (idx >= tweetCount) {
          return;
        }

        getFriendlyBoolean(response.data.user_id, tweets[idx].tweet_id, tweets[idx].isad);

        createRequests(tweets, idx + 1);
      }

      createRequests(tweets);
    })
    .catch((err) => {
      console.log('There was an error in GETting the feed object');
      console.log(err);
    });
};

getFeed();

module.exports = getFeed;
