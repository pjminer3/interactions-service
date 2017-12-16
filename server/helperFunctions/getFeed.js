import axios from 'axios';

import getFriendlyBoolean from './getFriendlyBoolean';


const getFeed = (userId) => {
  axios.get(`/feed/${userId}`)
    .then((response) => {
      /* 
      response.body 
      { user_id: 23432,
      tweets: [
        { tweet_id: string, isad: boolean },
        ... ,
        ... ,
      ]}
      */

    })
    .catch((err) => {
      console.log('Feed request failed: ', err);
    });
};


export default getFeed;
