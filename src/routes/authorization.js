const authorization = require('express').Router();
const { createUser, signin } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middlewares/validateCelebrate');

authorization.post('/signup', signupValidate, createUser);
authorization.post('/signin', signinValidate, signin);

module.exports = { authorization };
