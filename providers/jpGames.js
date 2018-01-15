const parser = require('rss-parser');
const helpers = require('../helpers');

const JPGAMES_RSS_URL = 'http://jpgames.de/feed/';

exports.extractNews = async (req, res) => {
  return new Promise((resolve, reject) => {
    let news = [];

    parser.parseURL(JPGAMES_RSS_URL, (err, parsed) => {
      if (err) {
        reject(`Error while fetching news from ${JPGAMES_RSS_URL}: ${err}`);
      }
      parsed.feed.entries.forEach(entry => {
        news.push({
          link: entry.link,
          author: entry.creator,
          provider: parsed.feed.title,
          date: entry.pubDate,
          id: entry.guid.match(/\d+/)[0],
          title: entry.title,
          description: helpers.decodeHtml(entry['content:encoded']),
          tags: entry.categories
        });
      });
      resolve(news);
    });
  });
};
