'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
	name: DataTypes.STRING,
	email: DataTypes.STRING,
	city: DataTypes.STRING,
	shop: DataTypes.STRING,
	password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
	User.hasMany(models.RespondentAnswer, {foreignKey: 'userId', onDelete: 'cascade', hooks: true, sourceKey: 'id'});
  };
  return User;
};
