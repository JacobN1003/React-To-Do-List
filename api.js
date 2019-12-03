const express = require('express');
const router = express.Router();
const Todo = require('./models/Todos');

//GET   
router.get('/', (req, res) => {
    Todo.find()
        .sort({ _id: -1 })
        .then(todos => res.json(todos))
})

//POST
router.post('/', (req, res) => {
    const newTodo = new Todo({ name: req.body.name });
    newTodo.save().then(todo => res.json(todo));
});

//DELETE
router.delete('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => todo.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

//PUT
router.put('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => todo.update(req.body).then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;