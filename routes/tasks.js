var express = require('express');
var router = express.Router();  

let tasks = [];

router.get('/getTasks', function(req, res, next) {
    //res.status(200).json(tasks);
    res.status(200).json(tasks);//tarea recuperada; respuesta 200;
});


router.post('/addTask', function(req, res, next) {
    let timeStamp = Date.now() + Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        req.body.id = timeStamp.toString();
        tasks.push(req.body);
        res.status(201).json(tasks);//solicitud se realizó correctamente; respuesta 201 
    }
     else {
        res.status(400).json({ error: "Faltan campos requeridos" }); // 400 Faltan campos
    }
});

router.delete('/removeTask/:id', function(req, res, next) {
    console.log("Llamada a /removeTask con id:", req.params.id);
    if (req.params && req.params.id) {
        let id = req.params.id;
        tasks = tasks.filter(task => task.id !== id);
        res.status(200).json({ message: "Tarea eliminada correctamente" });//se elimino correctamente; respuesta 200, 
    }else {
        res.status(400).json({ error: "ID inválido" }); // 400 Bad Request;
    }
})

module.exports = router;