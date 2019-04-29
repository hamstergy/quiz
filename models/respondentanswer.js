'use strict';
module.exports = (sequelize, DataTypes) => {
  const RespondentAnswer = sequelize.define('RespondentAnswer', {
	name: DataTypes.STRING,
	content: DataTypes.TEXT
  }, {});
  RespondentAnswer.associate = function(models) {
	// associations can be defined here
	RespondentAnswer.belongsTo(models.Survey, {foreignKey: 'surveyId', foreignKeyConstraint: true, onDelete: 'cascade', targetKey: 'id'});
  };
  return RespondentAnswer;
};
