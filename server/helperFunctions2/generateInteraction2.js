const generateInteraction = (feed) => {
  const interactions = [];
  
  feed.tweets.forEach((tweet) => {
    const prob = Math.random();
    if (tweet.isad && tweet.friendly && prob <= 0.075) {
      // if its an ad friends have interacted with => 7.5% chance for interaction
      interactions.push(tweet);
    } else if (tweet.isad && prob <= 0.025) {
      // if its an ad friends have NOT interacted with => 2.5% chance for interaction
      interactions.push(tweet);
    } else if (tweet.friendly && prob <= 0.3) {
      // if its a regular tweet that friends have interacted with => 30% chance for interaction
      interactions.push(tweet);
    } else if (prob <= 0.1) {
      // if its a regular tweet that friends have NOT interacted with => 10% chance for interaction
      interactions.push(tweet);
    }
  });

  return interactions;
};

module.exports = generateInteraction;

