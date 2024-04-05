const express = require('express');
const router = express.Router();
const { verifySignUp, validationErrorHandler } = require('../middleware');
const {
  userRegistrationValidator,
  userLoginValidator,
} = require('../validators/user.validator');
const authController = require('../controllers/auth.controller');

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post(
  '/api/auth/signup',
  [
    userRegistrationValidator,
    validationErrorHandler,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  authController.signup
);

router.post(
  '/api/auth/signin',
  [userLoginValidator, validationErrorHandler],
  authController.signin
);

module.exports = router;
