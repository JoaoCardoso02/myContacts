const express = require('express')
const router = express.Router() 

const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Get user  logged
router.get('/user/profile', AuthMiddleware, UserController.getUser)

// Get all users
router.get('/user', AuthMiddleware, UserController.getUsers)

// Sign Up
router.post('/user', UserController.createUser)

// Delete user
router.delete('/user', AuthMiddleware, UserController.deleteUser)

// Change data
router.put('/user', AuthMiddleware, UserController.alterData)

// Change password
router.put('/user/password', AuthMiddleware, UserController.alterPassword)

// Sign In
router.post('/user/login', AuthController.login)

module.exports = router;