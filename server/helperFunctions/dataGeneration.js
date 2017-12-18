const uuidv4 = require('uuid/v4');
const randomstring = require('randomstring');

function generateIntrID() {
  return uuidv4();
}

function generateUserID() {
  return Math.round(Math.random() * 999999999);
}

function generateTweetID() {
  return randomstring.generate(10);
}

function tweetIsAd() {
  const prob = Math.random();
  return prob > 0.2 ? false : true;
}

function friendlyInter(ad) {
  const prob = Math.random();
  if (ad) { // if tweet is an add, make it more likely it was prompted by a friend's interaction
    return prob > 0.5; // if the interaction belongs to an ad (20% of cases), 
    // then make 50% of them friend-inspired interactions
  }
  return prob > 0.8;
}

function generateTimestamp() {
  let currentTime = 1513196237428;
  let threeMonths = 7776000000;
  return currentTime + Math.round(Math.random() * threeMonths);
}


module.exports.generateIntrID = generateIntrID;
module.exports.generateUserID = generateUserID;
module.exports.generateTweetID = generateTweetID;
module.exports.tweetIsAd = tweetIsAd;
module.exports.friendlyInter = friendlyInter;
module.exports.generateTimestamp = generateTimestamp;
