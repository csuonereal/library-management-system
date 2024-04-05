const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId, {
    include: [
      {
        model: Role,
        as: 'role',
      },
    ],
  })
    .then(user => {
      if (user.role.name === 'admin') {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const isUser = (req, res, next) => {
  User.findByPk(req.userId, {
    include: [
      {
        model: Role,
        as: 'role',
      },
    ],
  })
    .then(user => {
      if (user.role.name === 'user') {
        next();
        return;
      }

      res.status(403).send({
        message: 'Require User Role!',
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
const isUserOrAdmin = (req, res, next) => {
  User.findByPk(req.userId, { include: 'role' })
    .then(user => {
      if (user && (user.role.name === 'admin' || user.role.name === 'user')) {
        next();
        return;
      }
      res.status(403).send({ message: 'Require Admin or User Role!' });
    })
    .catch(err => {
      res.status(500).send({ message: 'Error checking role: ' + err });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
  isUserOrAdmin: isUserOrAdmin,
};
module.exports = authJwt;
