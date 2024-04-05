const express = require('express');
const router = express.Router();
const { validationErrorHandler, authJwt } = require('../middleware');
const userBookController = require('../controllers/userbook.controller');
const {
  borrowBookValidator,
  returnBookValidator,
} = require('../validators/userbook.validator');

router.post(
  '/api/userbooks/borrow',
  [
    authJwt.verifyToken,
    authJwt.isUserOrAdmin,
    borrowBookValidator,
    validationErrorHandler,
  ],
  userBookController.borrowBook
);

router.post(
  '/api/userbooks/return',
  [
    authJwt.verifyToken,
    authJwt.isUserOrAdmin,
    returnBookValidator,
    validationErrorHandler,
  ],
  userBookController.returnBook
);

module.exports = router;
