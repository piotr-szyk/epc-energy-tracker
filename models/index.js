const User = require('./User');
const Favorite = require('./Favorite');

// A User can have many Favorite properties
User.hasMany(Favorite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Each Favorite belongs to a single User
Favorite.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Favorite };