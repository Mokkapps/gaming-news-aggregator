const parser = require('rss-parser');
const helpers = require('../helpers');

const URL = 'http://gamenewz.de/feed/';

exports.extractNews = async (req, res) => {
  return new Promise((resolve, reject) => {
    let news = [];

    parser.parseURL(URL, (err, parsed) => {
      if (err) {
        console.error(`Error while fetching news from ${URL}: ${err}`);
        reject(news);
      }
      parsed.feed.entries.forEach(entry => {
        news.push({
          link: entry.link,
          author: entry['dc:creator'],
          provider: parsed.feed.title,
          date: entry.isoDate,
          id: entry.guid.match(/\d+/)[0],
          title: entry.title,
          description: entry.content,
          tags: entry.categories
        });
      });
      resolve(news);
    });
  });
};
