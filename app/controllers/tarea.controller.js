const db = require("../models");
const Tarea = db.tareas;  
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.id_usuario) {
        res.status(400).send({
            message: "El contenido no puede estar vacío: id de usuario, "
        });
        return;
    }

    const tarea = {
    id_usuario: req.body.id_usuario,  
    nombre: req.body.nombre,
    estado: req.body.estado,
    fecha_vencimiento: req.body.fecha_vencimiento,
    };

    Tarea.create(tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error al crear la tarea."
            });
        });
};


exports.findAll = (req, res) => {
    const id_tarea = req.query.id_tarea;
    var condition = id_tarea ? { id_tarea: { [Op.eq]: id_tarea } } : null;

    Tarea.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo algún error al recuperar la tarea."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Tarea.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar tarea con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tarea.update(req.body, {
        where: { id_tarea: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "tarea fue actualizada exitosamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar la tarea con id=${id}. Quizás no se encontró la tarea o el cuerpo del requisito está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la tarea con id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    
    Tarea.destroy({
        where: { id_tarea: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La tarea fue eliminada exitosamente.!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar la tarea con id=${id}. El cliente no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la tarea con id=" + id
            });
        });
};

