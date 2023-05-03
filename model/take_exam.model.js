
module.exports = (sequelize, DataTypes) => {
    const TakeExam = sequelize.define("take_exams", {
      id_take_exam: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: DataTypes.ENUM('ongoing', 'pending', 'finished'),
        defaultValue : ('ongoing')
      },
      score: {
        type: DataTypes.FLOAT,
      },
      take_count: {
        type: DataTypes.STRING,
      },
      createdAt : {
        type : DataTypes.DATE,
      },
      updatedAt : {
        type : DataTypes.DATE,
      }
    }, {
      freezeTableName: true,
    });
    return TakeExam;
  };