const express = require('express');
const router = express.Router();
const { authJwt } = require('../middleware');
const userController = require('../controllers/user.controller');

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get('/api/test/all', userController.allAccess);

router.get(
  '/api/test/user',
  [authJwt.verifyToken, authJwt.isUserOrAdmin],
  userController.userBoard
);
router.get(
  '/api/test/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

router.get(
  '/api/users/:pk',
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.getUserByPk
);
router.get(
  '/api/users',
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.getAllUsers
);

module.exports = router;
