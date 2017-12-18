const getFriendlyBoolean = require('./getFriendlyBoolean');

// recursive function to create calls to Aygerim's service
module.exports = function createRequests(response, tweets) {
  // returns an iterable array of request promises to Social Graph Service
  return tweets.map(tweet => getFriendlyBoolean(response.data.user_id, tweet.tweet_id, tweet.isad));
};
