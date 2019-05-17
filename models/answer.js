'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    name: DataTypes.STRING,
    checked: DataTypes.BOOLEAN
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.Question, {foreignKey: 'questionId', foreignKeyConstraint: true, onDelete: 'cascade', targetKey: 'id'});
  };
  return Answer;
};