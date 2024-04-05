const { book: Book } = require('../models');

exports.createBook = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await Book.create({ name });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Book.',
    });
  }
};

exports.getByPk = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Book.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: `Book with id=${id} was not found.` });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error retrieving Book with id=' + id });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Book.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving books.',
    });
  }
};
