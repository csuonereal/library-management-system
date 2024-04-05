const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

const authRoutes = require('./app/routes/auth.routes');
const userRoutes = require('./app/routes/user.routes');
const bookRoutes = require('./app/routes/book.routes');
const userBookRoutes = require('./app/routes/userbook.routes');

app.use(authRoutes);
app.use(userRoutes);
app.use(bookRoutes);
app.use(userBookRoutes);

app.get('/', (req, res) => res.json({ message: 'Library Management API' }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

initializeDatabase();

async function initializeDatabase() {
  try {
    const syncOptions = { force: process.env.NODE_ENV === 'development' };
    await db.sequelize.sync(syncOptions);
    console.log(`Database synchronized. Force sync: ${syncOptions.force}`);

    if (syncOptions.force) {
      console.log('Running initial setup...');
      await initial();
    }
  } catch (error) {
    console.error('Failed to synchronize database:', error);
  }
}

async function initial() {
  const roles = await Promise.all([
    db.role.create({ id: 1, name: 'user' }),
    db.role.create({ id: 2, name: 'admin' }),
  ]);

  const adminRole = roles.find(role => role.name === 'admin');
  if (adminRole) {
    await db.user.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
      roleId: adminRole.id,
    });
    console.log('Admin user initialized.');
  }
}
