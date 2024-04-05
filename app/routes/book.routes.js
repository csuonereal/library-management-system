const express = require('express');
const router = express.Router();
const { validationErrorHandler, authJwt } = require('../middleware');
const bookController = require('../controllers/book.controller');
const { bookCreationValidator } = require('../validators/book.validator');

router.post(
  '/api/books',
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    bookCreationValidator,
    validationErrorHandler,
  ],
  bookController.createBook
);
router.get('/api/books', bookController.getAll);
router.get('/api/books/:id', bookController.getByPk);

module.exports = router;
