const User = require('../models/user');
const Customer = require('../models/customer');
const Review = require('../models/review');

User.hasMany(Customer, {
  foreignKey: "customer_id",
  onDelete: "cascade",
});

User.belongsTo(User, {
  primaryKey: "id",
});

Customer.hasMany(Review, {
  primaryKey: "review_id",
});

module.exports = { User, Customer, Review };
