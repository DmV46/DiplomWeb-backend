const routerArticles = require('express').Router();

const authorization = require('../middlewares/authorization');
const { getArticles, addArticle, deleteArticle } = require('../controllers/articles');
const { checkAddArticle, checkDeleteArticle } = require('../middlewares/validationCelebrate');

routerArticles.get('/articles', authorization, getArticles);
routerArticles.post('/articles', authorization, checkAddArticle, addArticle);
routerArticles.delete('/articles/:articleId', authorization, checkDeleteArticle, deleteArticle);

module.exports = routerArticles;
