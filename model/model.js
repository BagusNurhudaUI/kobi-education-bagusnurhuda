const dbConfig = require('../config/db.config')

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

sequelize
    .authenticate()
    .then(function () {
        console.log('Koneksi ke db telah  berhasil.');
    })
    .catch(function (err) {
        console.log('Tidak dapat melakukan koneksi ke db: ');
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);
db.exam = require("./exam.model")(sequelize, Sequelize);
db.question = require("./question.model")(sequelize, Sequelize);
db.take_exam = require("./take_exam.model")(sequelize, Sequelize);
db.take_answer = require("./take_answer.model")(sequelize, Sequelize);

db.exam.hasMany(db.question,{ foreignKey: {
  name: 'id_exam',
  allowNull: false
}});
db.question.belongsTo(db.exam,{ foreignKey: {
  name: 'id_exam',
  allowNull: false
}});

db.user.hasMany(db.take_exam, {foreignKey: {
  name: 'id_user',
  allowNull: false
}})
db.take_exam.belongsTo(db.user, {foreignKey: {
  name: 'id_user',
  allowNull: false
}})

db.exam.hasMany(db.take_exam, { foreignKey: {
  name: 'id_exam',
  allowNull: false
}})
db.take_exam.belongsTo(db.exam, { foreignKey: {
  name: 'id_exam',
  allowNull: false
}})

db.take_exam.hasMany(db.take_answer, { foreignKey: {
  name: 'id_take_exam',
  allowNull: false
}})
db.take_answer.belongsTo(db.take_exam,{ foreignKey: {
  name: 'id_take_exam',
  allowNull: false
}})

db.question.hasMany(db.take_answer, { foreignKey: {
  name: 'id_question',
  allowNull: false
}})
db.take_answer.belongsTo(db.question, { foreignKey: {
  name: 'id_question',
  allowNull: false
}})

module.exports = db;
