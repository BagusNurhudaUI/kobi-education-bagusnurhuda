
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
      id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      }, 
      photo_url: {
        type: DataTypes.STRING,
      },
      role : {
        type : DataTypes.ENUM('admin', 'student'),

      },
      createdAt : {
        type : DataTypes.DATE,
      }
    }, {
      updatedAt: false,
      freezeTableName: true,
    });
    return User;
  };