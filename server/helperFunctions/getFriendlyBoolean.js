const axios = require('axios');

const getFriendlyBoolean = (userId, arrayOfTweetIds, arrayOfIsAds) => {
  return axios.get('http://127.0.0.1:3000/user', { // User service
    params: {
      user_id: userId,
      tweet_ids: arrayOfTweetIds,
    },
  });
};

module.exports = getFriendlyBoolean;
