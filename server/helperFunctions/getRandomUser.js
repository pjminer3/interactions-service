// generate random user to login
module.exports = function getRandomUser() {
  return Math.round(Math.random() * 10000000);
};
