
module.exports = (sequelize, DataTypes) => {
    const TakeAnswer = sequelize.define("take_answers", {
      id_take_answer: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      answer_text: {
        type: DataTypes.STRING,
      },
      nilai : {
        type : DataTypes.FLOAT,
      },
      updatedAt : {
        type : DataTypes.DATE,
      }
    }, {
      freezeTableName: true,
    });
    return TakeAnswer;
  };