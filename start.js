const mongoose = require('mongoose');
const http = require('http');

const APP_NAME = 'gaming-news';
const MONITORING_URL = 'http://nosnch.in/97982161bb';

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });

// Connect to database and handle any bad connections
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useMongoClient: true
  })
  .catch(err => {
    console.error(`Could not connect to database → ${err.message}`);
  });

// import all models
require('./models/News');

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);

  // Keep free Heroku web dyno alive
  setInterval(() => {
    http.get(`http://${APP_NAME}.herokuapp.com`);
  }, 5 * 60 * 1000); // every 5 minutes

  // Monitoring
  setInterval(() => {
    http.get(MONITORING_URL);
  }, 1800 * 1000); // every 30 minutes

  // Start background fetching
  const newsFetchService = require('./services/newsFetchService');
  newsFetchService.start();
});
