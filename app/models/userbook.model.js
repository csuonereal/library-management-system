module.exports = (sequelize, Sequelize) => {
  const UserBook = sequelize.define(
    'user_books',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id',
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null,
      },
      borrowedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      returnedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['userId', 'bookId', 'isActive'],
        },
      ],
    }
  );

  return UserBook;
};
