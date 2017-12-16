const app = require('./../index');

  /* 
  response.body => {
    user_id: ###,
    tweets: [
      { tweet_id: ####, isad: boolean },
      ...,
      ...,
    ]
  } 
  */

// const getUserFriends = (request, response, next) => {
//   // send get request to Aygerim's service
//     // cycle through each tweet ID and create a request
//   const { tweets } = response.body;
//   for (let i = 0; i < tweets.length; i++) {
//     app.get(`/user/${response.user}/${tweets[i]}`, (request, response) {
//       re
//     })
//   }
// };

// export default getUserFriends;
