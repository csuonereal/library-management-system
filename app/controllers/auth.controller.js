const { user: User, role: Role } = require('../models');
const { secret } = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const role = await Role.findOne({ where: { name: 'user' } });

    if (!role) {
      return res.status(500).send({ message: 'Role not found.' });
    }

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roleId: role.id,
    });

    res.send({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      include: [{ model: Role, as: 'role' }],
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, secret, {
      algorithm: 'HS256',
      expiresIn: 86400,
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: `ROLE_${user.role.name.toUpperCase()}`,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
