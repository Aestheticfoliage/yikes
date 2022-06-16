const User = require('./user');
const Customer = require('./customer');
const Review = require('./review');

User.hasMany(Customer, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// User.belongsTo(User, {
//   primaryKey: "id",
// });

Customer.hasMany(Review, {
  foreignKey: 'customer_id',
  onDelete: 'CASCADE',
});

Review.belongsTo(Customer, {
  foreignKey: 'customer_id',
  onDelete: 'CASCADE',
});

Customer.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Customer, Review };
