const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos');
const auth = require('../middelware/auth');
router.use(auth);
router.get('/', (req, res, next) => {
    const todo = todoController.find().then((todo) => {
        if (!todo) {
            res.status(404).end();
            return;
        }
        res.json(todo);
    }).catch(e => {
        res.status(500).json(e);
    })
})
router.get('/:userID/todos', (req, res, next) => {
    const { userID } = req.params;
    const todo = todoController.todosSpecificUser(parseInt(userID))
        .then((todo) => {
            if (!todo) {
                res.status(404).end();
                return;
            }
            res.json(todo);
        }).catch(e => {
            res.status(500).json(e);
        })
});
router.get('/:limit?/:skip?', (req, res, next) => {
    let { limit, skip } = req.params;
    limit=limit?limit:10;
    skip=skip?skip:0;
    const todo = todoController.todoslimit_skip(limit,skip)
        .then((todo) => {
            if (!todo) {
                res.status(404).end();
                return;
            }
            res.json(todo);
        }).catch(e => {
            res.status(500).json(e);
        })
});
router.post('/', (req, res, next) => {
    const { title } = req.body;
    const { tags } = req.body;
    const user = req.user;
    console.log(user);
    const todo = todoController.create({ title, tags, userID: user._id }).then((todo) => {
        if (!todo) {
            res.status(404).end();
            return;
        }
        res.json(todo);
    }).catch(e => {
        res.status(500).json(e);
    })
})
router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const todo = todoController.updateTitle(parseInt(id), req.body).then((todo) => {
        if (!todo) {
            res.status(404).end();
            return;
        }
        res.json(todo);
    }).catch(e => {
        res.status(500).json(e);
    })

})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    const todo = todoController.deleteTodo(parseInt(id)).then((todo) => {
        if (!todo) {
            res.status(404).end();
            return;
        }
        res.json(todo);
    }).catch(e => {
        res.status(500).json(e);
    })
});
module.exports = router;