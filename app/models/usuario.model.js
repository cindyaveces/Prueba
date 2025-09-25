
module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuarios", {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING(100)
        },
        correo: {
            type: Sequelize.STRING(100)
        },
        contrasenia: {
            type: Sequelize.STRING(255)
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    return Usuario;
};