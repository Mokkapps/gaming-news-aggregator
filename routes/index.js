const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(newsController.getNews));
router.get('/news', catchErrors(newsController.getNews));

module.exports = router;
