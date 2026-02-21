const User = require('./User');
const Favorite = require('./Favorite');
const Recommendation = require('./Recommendation');

// 1. User <-> Favorite Relationship
User.hasMany(Favorite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Favorite.belongsTo(User, {
  foreignKey: 'user_id'
});

// 2. Favorite <-> Recommendation Relationship
// A Favorite property can have many recommendations
Favorite.hasMany(Recommendation, {
  foreignKey: 'favorite_id',
  onDelete: 'CASCADE'
});

// Each Recommendation belongs to a specific Favorite property
Recommendation.belongsTo(Favorite, {
  foreignKey: 'favorite_id'
});

module.exports = { User, Favorite, Recommendation };