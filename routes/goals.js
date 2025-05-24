var express = require('express');
var router = express.Router();  
const mongoose = require('mongoose');

const goalInit = mongoose.model('goal',{
    name: String,
    description: String,
    dueDate: String,
}, 'goals')

router.get('/getGoals', function(req, res, next) {
    goalInit.find({}).then((response) => 
        res.status(200).json(response))//meta recuperada correctamente code 200
    .catch((error) => {
        console.error("Error al recuperar las metas:", error);
        res.status(500).json({ error: "Error al recuperar las metas" });
    });
});


router.post('/addGoals', function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        const task = new goalInit(req.body);
        task.save()
            .then(() => {
                console.log("Meta guardada en la base de datos");
                res.status(201).json({});///meta creada correctamente code 201
            })
            .catch((error) => {
                console.error("Error al guardar la meta:", error.message, error);
                res.status(500).json({ error: "Error al guardar la meta" });//error al guardar la meta code 500
            });
    }
     else {
        res.status(400).json({ error: "Faltan campos requeridos" }); // 400 Faltan campos
    }
});


router.delete('/removeGoal/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        let id = req.params.id;
        goalInit.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).
then(() => {
            console.log("Meta eliminada de la base de datos");
            res.status(200).json({response: "Meta eliminada correctamente"});//meta eliminada correctamente code 200
        }).catch((error) => {
            console.error("Error al eliminar la Meta:", error.message,error );
            res.status(500).json({ error: "Error al eliminar la meta" });//error al eliminar la meta code 500
        });
    }else {
        res.status(400).json({ error: "ID inválido" }); // 400 Bad Request;
    }
})


module.exports = router;