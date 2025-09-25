
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions:{
     ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,

   
  }
});

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

const Usuario=require("./usuario.model.js")(sequelize,Sequelize);
const Tarea=require("./tarea.model.js")(sequelize,Sequelize); ;



db.usuarios = Usuario;
db.tareas = Tarea;

Usuario.hasMany(Tarea,{foreignKey:"id_usuario"});
Tarea.belongsTo(Usuario,{foreignKey:"id_usuario"});

module.exports = db;