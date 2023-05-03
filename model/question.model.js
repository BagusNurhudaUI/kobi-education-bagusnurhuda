
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("questions", {
      id_question: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      no_question: {
        type: DataTypes.INTEGER,
      },
      type : {
        type : DataTypes.ENUM("choices","filltheblanks", "essayimages", "essay")
      },
      question_text: {
        type: DataTypes.STRING
      },
      photo_url: {
        type: DataTypes.STRING
      },
      audio_url: {
        type: DataTypes.STRING,
      },
      answer: {
        type: DataTypes.STRING,
      }, 
      option_a: {
        type: DataTypes.STRING,
      },
      option_b: {
        type: DataTypes.STRING,
      },
      option_c: {
        type: DataTypes.STRING,
      },
      option_d: {
        type: DataTypes.STRING,
      },
      createdAt : {
        type : DataTypes.DATE,
      }
    }, {
      updatedAt: false,
      freezeTableName: true,
    });
    return Question;
  };