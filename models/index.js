const User = require('./user');
const Customer = require('./customer');
const Review = require('./review');

User.hasMany(Customer, {
  foreignKey: "customer_id",
  onDelete: "cascade",
});

// User.belongsTo(User, {
//   primaryKey: "id",
// });

Customer.hasMany(Review, {
  foreignKey: "review_id",
});

Review.belongsTo(Customer, {
  foreignKey: "customer_id"
})

module.exports = { User, Customer, Review };
