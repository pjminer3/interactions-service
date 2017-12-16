const addUserToRes = (request, response, next) => {
  /* response.body => {
    user_id: ###,
    tweets: [
      { tweet_id: ####, isad: boolean },
      ...,
      ...,
    ]
  } */

  const user = response.body.user_id;

  response.user = user;
  next();
}

export default addUserToRes;
