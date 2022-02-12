const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
router.get('/', (req, res, next) => {
    userController.usersNames()
        .then((data) => {
            if (!data) {
                res.status(204).end();
                return
            }
            res.json(data)
        })
        .catch(e => res.status(401).json(e))
})

router.post('/', (req, res, next) => {
    const user = req.body;
    userController.create(user)
        .then(user => res.json(user))
        .catch(e => res.status(422).json(e))
})
router.post('/login', (req, res, next) => {
    const userCred = req.body;
    userController.login(userCred)
        .then(data => res.json(data))
        .catch(e => res.status(401).json(e))
})
router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    // const user1 = req.user;
    const user = userController.updateUser(parseInt(id), req.body).then((user) => {
        if (!user) {
            res.status(404).end();
            return;
        }
        res.json({ "message": "user was edited successfully", "TheUserAfterEdit": user });
    }).catch(e => {
        res.status(500).json(e);
    })
})
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    const user = userController.deleteUser(parseInt(id)).then((user) => {
        if (!user) {
            res.status(404).end();
            return;
        }
        res.json(user);
    }).catch(e => {
        res.status(500).json(e);
    })
});
module.exports = router;