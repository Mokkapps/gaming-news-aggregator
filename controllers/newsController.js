const mongoose = require('mongoose');
const News = mongoose.model('News');

exports.getNews = async (req, res) => {
  const news = await News.find({})
    .sort({ date: -1 }) // Sort by descending date
    .exec((err, docs) => {
      if (err) {
        console.error(`Error while getting news: ${err}`);
      }
    });
  return res.json(news);
};
