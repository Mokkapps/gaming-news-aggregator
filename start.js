const mongoose = require('mongoose');
const http = require('http');

const APP_NAME = 'gaming-news';

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

  setInterval(function() {
    http.get(`http://${APP_NAME}.herokuapp.com`);
  }, 300000); // every 5 minutes (300000)

  // Start background fetching
  const newsFetchService = require('./services/newsFetchService');
  newsFetchService.start();
});
