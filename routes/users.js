const routerUser = require('express').Router();

const authentication = require('../middlewares/authentication');
const { getUser, signUp, signIn } = require('../controllers/users');
const { checkSignUp, checkSignIn } = require('../middlewares/validationCelebrate');

routerUser.get('/users/me', authentication, getUser);
routerUser.post('/signup', checkSignUp, signUp);
routerUser.post('/signin', checkSignIn, signIn);

module.exports = routerUser;
