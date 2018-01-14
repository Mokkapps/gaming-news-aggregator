const axios = require('axios');
const helpers = require('../helpers');

const REBELGAMER_URL =
  'https://www.rebelgamer.de/wp-json/wp/v2/posts?_embed=true&page=1&per_page=10';

exports.extractNews = async (req, res) => {
  const response = await axios.get(REBELGAMER_URL);

  let news = [];

  response.data.forEach(article => {
    const tags = [];
    article._embedded['wp:term'][1].forEach(term => {
      tags.push(term.name);
    });
    news.push({
      id: article.id,
      title: helpers.decodeHtml(article.title.rendered),
      description: helpers.decodeHtml(article.content.rendered),
      image: helpers.decodeHtml(
        article._embedded['wp:featuredmedia'][0].source_url
      ),
      tags: tags
    });
  });

  return news;
};
