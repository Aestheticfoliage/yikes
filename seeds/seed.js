const sequelize = require("../config/connection");
const { User, Customer } = require("../models");

const userData = require("./user.json");
const customerData = require("./customer.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const customer of customerData) {
    await Customer.create({
      ...customer,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
