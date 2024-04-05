const { user: User, role: Role } = require('../models');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.getUserByPk = async (req, res) => {
  try {
    const userId = req.params.pk;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'roleId'],
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'roleId'],
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
