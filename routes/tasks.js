var express = require('express');
var router = express.Router();  

let tasks = [];

router.get('/getTasks', function(req, res, next) {
    res.json(tasks);
});


router.post('/addTask', function(req, res, next) {
    let timeStamp = Date.now() + Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        req.body.id = timeStamp.toString();
        tasks.push(req.body);
    }
    res.json(tasks);
});

router.delete('/removeTask/:id', function(req, res, next) {
    console.log("Llamada a /removeTask con id:", req.params.id);
    if (req.params && req.params.id) {
        let id = req.params.id;
        tasks = tasks.filter(task => task.id !== id);
        res.json(tasks);
    }else {
        res.json({});
    }
})

module.exports = router;