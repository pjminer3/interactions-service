const axios = require('axios');

const getRandomUser = require('./getRandomUser');
const createFriendlyQueryRequests = require('./createFriendQueryRequest');

const getFeed = () => {
  const user = getRandomUser();

  axios.get(`http://127.0.0.1:3000/feed/${user}`)
    .then((response) => {
      console.log('Successfuly got feed object: ', response.data);
      const { tweets } = response.data;

      // call to create all requests to Social Graph Service
      Promise.all(createFriendlyQueryRequests(response, tweets))
        .then((response) => {
          console.log('***All Requests to Social Graph Service were sucessful***');
        })
        .catch((err) => {
          console.log('***There was an error in requests to Social Graph Service***');
        });
    })
    .catch((err) => {
      console.log('*** There was an error in GETting the feed object ***');
      console.log(err);
    });
};

module.exports = getFeed;

// TODO: modularize helper functions
// TODO: use map to create the requests instead of idx 
// create a promise.all for the mapped requests
