const db = require("../models");
const Usuario = db.usuarios;  
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const usuario = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
        
        
    };

    Usuario.create(usuario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Usuario."
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Usuario.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving  USUARIO."
            });
        });
};


exports.findOne = (req, res) => {
    const id= req.params.id;

    Usuario.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving usuario with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Usuario.update(req.body, {
        where: { id_usuario: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "usuario was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update usuario with id=${id}. Maybe usuario was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating usuario with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    
    Usuario.destroy({
        where: { id_usuario: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Usuario was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete usuario with id=${id}. El usuario no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete usuario with id=" + id
            });
        });
};

