var express = require('express');
var router = express.Router();  
const mongoose = require('mongoose');

const taskInit = mongoose.model('task',{
    /*id : String,
    name: String,
    description: String,
    dueDate: String,
}, 'tasks')*/
name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true } 
}, 'tasks');


router.get('/getTasks', function(req, res, next) {
    taskInit.find({}).then((response) => 
        res.status(200).json(response))//meta recuperada correctamente code 200
    .catch((error) => {
        console.error("Error al recuperar las tareas:", error);
        res.status(500).json({ error: "Error al recuperar las tareas" });// error al recuperar las tareas code 500
    });
});

router.post('/addTask', function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        delete req.body._id;
        const task = new taskInit(req.body);
        task.save()
            .then(() => {
                console.log("Tarea guardada en la base de datos");
                res.status(201).json({});// tarea creada correctamente code 201
            })
            .catch((error) => {
                console.error("Error al guardar la tarea:", error.message, error);
                res.status(500).json({ error: "Error al guardar la tarea" });// error al guardar la tarea code 500
            });
    }
     else {
        res.status(400).json({ error: "Faltan campos requeridos" }); // 400 Faltan campos
    }
});

router.delete('/removeTask/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        let id = req.params.id;
        taskInit.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).
then(() => {
            console.log("Tarea eliminada de la base de datos");
            res.status(200).json({response: "Tarea eliminada correctamente"});// tarea eliminada correctamente code 200
        }).catch((error) => {
            console.error("Error al eliminar la tarea:", error);
            res.status(500).json({ error: "Error al eliminar la tarea" });// error al eliminar la tarea code 500
        });
    }else {
        res.status(400).json({ error: "ID inválido" }); // 400 Bad Request;
    }
})

module.exports = router;