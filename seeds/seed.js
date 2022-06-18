const sequelize = require("../config/connection");
const { User, Review } = require("../models");

const userData = require("./user.json");
//const customerData = require("./customer.json");
const reviewData = require("./review.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

/*  for (const customer of customerData) {
    await Customer.create({
      ...customer,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
*/
  for(const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();
