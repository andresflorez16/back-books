const { Router } = require('express');
const router = Router();
const {getUsers, addUsers, deleteUsers, updateUsers, getUser} = require('../controllers/users.controller')

router.get('/users', getUsers );
router.get('/users/:id', getUser );
router.post('/users/add', addUsers );
router.delete('/users/:id', deleteUsers );
router.put('/users/:id', updateUsers );

module.exports = router;    
