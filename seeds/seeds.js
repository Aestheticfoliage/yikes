const req = require("express/lib/request");
const sequelize = require("../config/connection");
const { User, Customer } = require("../models");

const userData = require("../seeds/user.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    indivdualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
