module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define('books', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    averageRating: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
  });

  return Book;
};
