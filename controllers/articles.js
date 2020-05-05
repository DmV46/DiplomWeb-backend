const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const { ITEM_NOT_FOUND, FORBIDDEN_ERROR } = require('../configuration/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles.map((article) => article.omitPrivate())))
    .catch(next);
};

const addArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send(article.omitPrivate()))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById({ _id: articleId })
    .orFail(() => {
      throw new NotFoundError(ITEM_NOT_FOUND);
    })
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN_ERROR);
      }
      Article.remove(article).then(() => res.send(article.omitPrivate()));
    })
    .catch(next);
};

module.exports = { getArticles, addArticle, deleteArticle };
