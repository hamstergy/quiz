'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    name: DataTypes.STRING,
    type: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    // Question.hasMany(models.Answer);
    Question.hasMany(models.Answer, {foreignKey: 'questionId', onDelete: 'cascade', hooks: true, sourceKey: 'id'});
    Question.belongsTo(models.Survey, {foreignKey: 'surveyId', foreignKeyConstraint: true, onDelete: 'cascade', targetKey: 'id'});
  };
  return Question;
};
