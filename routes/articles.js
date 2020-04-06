const routerArticles = require('express').Router();

const authentication = require('../middlewares/authentication');
const { getArticles, addArticle, deleteArticle } = require('../controllers/articles');
const { checkAddArticle, checkDeleteArticle } = require('../middlewares/validationCelebrate');

routerArticles.get('/articles', authentication, getArticles);
routerArticles.post('/articles', authentication, checkAddArticle, addArticle);
routerArticles.delete('/articles/:articleId', authentication, checkDeleteArticle, deleteArticle);

module.exports = routerArticles;
