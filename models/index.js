const User = require('./user');
// const Customer = require('./customer');
const Review = require('./review');

//User.hasMany(Customer, {
//  foreignKey: 'user_id',
//  onDelete: 'CASCADE',
//});

// User.belongsTo(User, {
//   primaryKey: "id",
// });

User.hasMany(Review, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


Review.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Review };
