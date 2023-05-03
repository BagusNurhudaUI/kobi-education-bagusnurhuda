
module.exports = (sequelize, DataTypes) => {
    const Exam = sequelize.define("exams", {
      id_exam: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      duration: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
      }, 
      photo_url: {
        type: DataTypes.STRING,
      },
      audio_url : {
        type : DataTypes.STRING,

      },
      createdAt : {
        type : DataTypes.DATE,
      }
    }, {
      updatedAt: false,
      freezeTableName: true,
    });
    return Exam;
  };