const { body } = require('express-validator');

const bookCreationValidator = [
  body('name').trim().not().isEmpty().withMessage('Book name is required.'),
];

module.exports = {
  bookCreationValidator,
};
