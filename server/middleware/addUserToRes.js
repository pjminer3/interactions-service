const addUserToRes = (request, response, next) => {
  /* response.body => {
    user_id: ###,
    tweets: [
      { tweet_id: ####, isad: boolean },
      ...,
      ...,
    ]
  } */

  const user = request.body.user_id;

  response.user = user;
  next();
}

export default addUserToRes;
