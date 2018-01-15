const mongoose = require('mongoose');
const axios = require('axios');
const moment = require('moment');
const News = mongoose.model('News');
const rebelGamer = require('../providers/rebelgamer');
const jpGames = require('../providers/jpGames');

const FETCH_INTERVAL_IN_MS = 1800 * 1000; // each 30 minutes

exports.start = async (req, res) => {
  setInterval(async () => {
    console.log(`Fetching articles at ${moment()}`);

    // RebelGamer
    const rebelgamerNews = await rebelGamer.extractNews();
    await storeArticle(rebelgamerNews);
    console.log('Stored RebelGamer articles in database');

    // JPGames
    const jpGamesNews = await jpGames.extractNews();
    await storeArticle(jpGamesNews);
    console.log('Stored JPGames articles in database');

  }, FETCH_INTERVAL_IN_MS);
};

storeArticle = async (news) => {
  const promises = news.map(article =>
    News.findOneAndUpdate({ id: article.id }, article, {
      new: true, // return the modified document rather than the original
      upsert: true, //  creates the object if it doesn't exist,
      runValidators: true
    }).exec()
  );
  await Promise.all(promises);
}

exports.rebelGamer;
