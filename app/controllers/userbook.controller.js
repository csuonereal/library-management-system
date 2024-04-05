const { book: Book, userBook: UserBook } = require('../models');
const { Sequelize } = require('sequelize');

exports.borrowBook = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.userId;

  try {
    const activeBorrow = await UserBook.findOne({
      where: {
        bookId,
        isActive: true,
      },
    });

    if (activeBorrow) {
      return res.status(400).send({
        message: 'This book is already borrowed and not returned yet.',
      });
    }

    const userBook = await UserBook.create({
      userId,
      bookId,
      borrowedAt: new Date(),
      isActive: true,
    });
    res.status(200).send(userBook);
  } catch (err) {
    console.error('Error in borrowBook:', err);
    res.status(500).send({ message: err.message });
  }
};

exports.returnBook = async (req, res) => {
  const { bookId, rating } = req.body;
  const userId = req.userId;

  try {
    const borrowRecord = await UserBook.findOne({
      where: {
        userId,
        bookId,
        isActive: true,
      },
    });

    if (!borrowRecord) {
      return res.status(400).send({
        message:
          'This book is not currently borrowed by the user or already returned.',
      });
    }

    await UserBook.update(
      { isActive: false, returnedAt: new Date(), rating: rating || null },
      { where: { userId, bookId, isActive: true } }
    );

    if (rating) {
      await updateBookAverageRating(bookId);
    }

    res.status(200).send({
      message:
        'Book returned successfully.' + (rating ? ' Rating updated.' : ''),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

async function updateBookAverageRating(bookId) {
  try {
    const ratedRecords = await UserBook.findAll({
      where: { bookId, rating: { [Sequelize.Op.not]: null } },
      attributes: ['rating'],
    });

    const totalRating = ratedRecords.reduce(
      (total, { rating }) => total + rating,
      0
    );
    const averageRating = ratedRecords.length
      ? totalRating / ratedRecords.length
      : null;

    await Book.update({ averageRating }, { where: { id: bookId } });
  } catch (err) {
    console.error("Failed to update book's average rating:", err);
  }
}
