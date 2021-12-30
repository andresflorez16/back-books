const { Router } = require('express');
const router = Router();
const {getUsers, addUsers, deleteUsers, updateUsers, getUser, getUserToken, loginUser } = require('../controllers/users.controller')
const authMiddleware = require('../middlewares/authValidator')

router.get('/users', authMiddleware, getUsers );
router.get('/users/:id', authMiddleware, getUser );
router.get('/user', getUserToken)
router.post('/users/add', addUsers );
router.post('/users/login', loginUser );
router.delete('/users/:id', authMiddleware, deleteUsers );
router.put('/users/:id', authMiddleware, updateUsers );

module.exports = router; 
