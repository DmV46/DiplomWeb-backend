const router = require('express').Router();

const routerUser = require('./users');
const routerArticle = require('./articles');

const { RESOURCE_NOT_FOUND } = require('../configuration/constants');
const NotFoundError = require('../errors/NotFoundError');

router.use(routerUser);
router.use(routerArticle);

router.use(() => {
  throw new NotFoundError(RESOURCE_NOT_FOUND);
});

module.exports = router;
