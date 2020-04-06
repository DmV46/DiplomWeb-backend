const router = require('express').Router();
const routerUser = require('./users');
const routerArticle = require('./articles');

router.use(routerUser);
router.use(routerArticle);

router.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
