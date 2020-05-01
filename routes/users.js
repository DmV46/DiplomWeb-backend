const routerUser = require('express').Router();

const authorization = require('../middlewares/authorization');
const { getUser, signUp, signIn } = require('../controllers/users');
const { checkSignUp, checkSignIn } = require('../middlewares/validationCelebrate');

routerUser.get('/users/me', authorization, getUser);
routerUser.post('/signup', checkSignUp, signUp);
routerUser.post('/signin', checkSignIn, signIn);

module.exports = routerUser;
