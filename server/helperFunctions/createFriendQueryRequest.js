const getFriendlyBoolean = require('./getFriendlyBoolean');

// recursive function to create calls to Aygerim's service
module.exports = function createRequests(response, tweets) {
  tweets.map((tweet) => {
    getFriendlyBoolean(response.data.user_id, tweet.tweet_id, tweet.isad);
  });
};
