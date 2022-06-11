const User = require('../models/user');
const Customer = require('../models/customer');

User.hasMany(Customer, {
  foreignKey: "customer_id",
  onDelete: "cascade",
});

User.belongsTo(User, {
  primaryKey: "id",
});

module.exports = { User, Customer };
