const axios = require('axios');

const generateInteraction = require('./generateInteraction');

const getFriendlyBoolean = (userId, tweetId, isAd) => {
  axios.get('http://127.0.0.1:3000/user', {
    params: {
      user_id: userId,
      tweet_id: tweetId,
    },
  }) // TODO: change this to Aygerim's actual service
    .then((response) => {
      console.log('------------------ this is response for Friendly_intr: ', response.data); // response.data is how you get what send in a json response
      console.log('------------------ this is response.data type for Friendly_intr: ', typeof response.data); // came back as a boolean
      generateInteraction(userId, tweetId, isAd, response.data); // TODO: double check with Aygerim that this is how her reponse object is going to be organized
    })
    .catch((err) => {
      console.log('There was an error retreiving friend boolean: ', err);
    });
};

// getFriendlyBoolean(333, 'three three three', true); // successfully creates database interactions

module.exports = getFriendlyBoolean;
