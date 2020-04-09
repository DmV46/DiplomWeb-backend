const { celebrate, Joi } = require('celebrate');

// //////////////////////////////////
// /                              ///
// /        Validation User       ///
// /                              ///
// //////////////////////////////////

const checkSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// //////////////////////////////////
// /                              ///
// /      Validation Article      ///
// /                              ///
// //////////////////////////////////

const checkAddArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
});

const checkDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  checkSignUp, checkSignIn, checkAddArticle, checkDeleteArticle,
};
