var express = require('express');
var router = express.Router();  

let goals = [];

router.get('/getGoals', function(req, res, next) {
    console.log("Llamada a /getGoals");
    res.json(goals);
});


router.post('/addGoals', function(req, res, next) {
    console.log("Body recibido:", req.body);
    let timeStamp = Date.now() + Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        req.body.id = timeStamp.toString();
        goals.push(req.body);
    }
    res.json(goals);
});

router.delete('/removeGoal/:id', function(req, res, next) {
    console.log("Llamada a /removeGoal con id:", req.params.id);
    if (req.params && req.params.id) {
        let id = req.params.id;
        goals = goals.filter(goals => goals.id !== id);
        res.json(goals);
    }else {
        res.json({});
    }
})

module.exports = router;