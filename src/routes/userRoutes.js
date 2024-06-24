const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/worko/user', authMiddleware, userController.getAllUsers);
router.get('/worko/user/:userId', authMiddleware, userController.getUserById);
router.post('/worko/user', authMiddleware, userController.createUser);
router.put('/worko/user/:userId', authMiddleware, userController.updateUser);
router.patch('/worko/user/:userId', authMiddleware, userController.updateUser);
router.delete('/worko/user/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
