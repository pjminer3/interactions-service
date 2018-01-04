const kue = require('kue');

const queue = kue.createQueue();

// function for creating 'login' jobs
const createUserLogin = () => {
  const job = queue.create('login');
  job.attempts(5)
    .save((err) => {
      if (!err) {
        console.log(job.id);
      }
    });
};

queue.process('login', (job, done) => {
  console.log(`Login and interactions for id ${job.id} is done`);
  done && done();
});


module.exports = {
  createLogin: () => {
    createUserLogin();
  },
};
