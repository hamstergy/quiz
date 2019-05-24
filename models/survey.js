'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Survey.associate = function(models) {
    // Survey.hasMany(models.Question);
	Survey.hasMany(models.Question, {foreignKey: 'surveyId', onDelete: 'cascade', hooks: true, sourceKey: 'id'});
	Survey.hasMany(models.RespondentAnswer, {foreignKey: 'surveyId', onDelete: 'cascade', hooks: true, sourceKey: 'id'});
  };
  return Survey;
};
