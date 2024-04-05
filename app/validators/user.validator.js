const { body } = require('express-validator');

const userRegistrationValidator = [
  body('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),

  body('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const userLoginValidator = [
  body('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username or Email is required'),

  body('password').trim().not().isEmpty().withMessage('Password is required'),
];

module.exports = {
  userRegistrationValidator,
  userLoginValidator,
};
