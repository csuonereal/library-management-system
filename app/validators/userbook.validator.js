const { body } = require('express-validator');

const borrowBookValidator = [
  body('bookId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Book ID is required.')
    .isInt({ gt: 0 })
    .withMessage('Book ID must be a positive integer.'),
];

const returnBookValidator = [
  body('bookId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Book ID is required.')
    .isInt({ gt: 0 })
    .withMessage('Book ID must be a positive integer.'),
  body('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be a float between 0 and 5.'),
];

module.exports = {
  borrowBookValidator,
  returnBookValidator,
};
