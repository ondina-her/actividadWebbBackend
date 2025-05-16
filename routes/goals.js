var express = require('express');
var router = express.Router();  

let goals = [];

router.get('/getGoals', function(req, res, next) {
    console.log("Llamada a /getGoals");
    res.status(200).json(goals);
});


router.post('/addGoals', function(req, res, next) {
    console.log("Body recibido:", req.body);
    let timeStamp = Date.now() + Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        req.body.id = timeStamp.toString();
        goals.push(req.body);
        res.status(201).json(goals);//solicitud se realizó correctamente; respuesta 201
    } else {
        res.status(400).json({ error: "Faltan campos requeridos" }); // 400 Faltan campos
    }
});

router.delete('/removeGoal/:id', function(req, res, next) {
    console.log("Llamada a /removeGoal con id:", req.params.id);
    if (req.params && req.params.id) {
        let id = req.params.id;
        goals = goals.filter(goals => goals.id !== id);
        res.status(200).json({ message: "Meta eliminada correctamente" }); // 200 OK
    } else {
        res.status(400).json({ error: "ID inválido" }); // 400 Bad Request
    }
})

module.exports = router;