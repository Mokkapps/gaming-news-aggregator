const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });

// Connect to our database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`Could not connect to database → ${err.message}`);
});

// READY?! Let's go!

// import all of our models
// FIXME require('./models/Store');

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
