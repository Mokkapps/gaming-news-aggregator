const mongoose = require('mongoose');
const News = mongoose.model('News');

exports.getNews = async (req, res) => {
  const news = await News.find();
  return res.json(news);
};
