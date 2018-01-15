const mongoose = require('mongoose');
const axios = require('axios');
const moment = require('moment');
const News = mongoose.model('News');
const rebelGamer = require('../providers/rebelgamer');

const FETCH_INTERVAL_IN_MS = 1800 * 1000; // each 30 minutes

exports.start = async (req, res) => {
  setInterval(async () => {
    console.log(`Fetch articles at ${moment()}`);

    const rebelgamerNews = await rebelGamer.extractNews();
    const rebelGamerPromises = rebelgamerNews.map(news =>
      News.findOneAndUpdate({ id: news.id }, news, {
        new: true, // return the modified document rather than the original
        upsert: true, //  creates the object if it doesn't exist,
        runValidators: true
      }).exec()
    );
    await Promise.all(rebelGamerPromises);

    console.log('Stored RebelGamer articles in database');
  }, FETCH_INTERVAL_IN_MS);
};

exports.rebelGamer;
