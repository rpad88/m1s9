const express = require('express')
const router = express.Router()

// MIDDLEWARES
const validateNewUser = require('../../src/middlewares/validate-new-user')
const validateToken = require('../../src/middlewares/validate-token')

// CONTROLLERS
const createTask = require('../controllers/tasks/createTask')
const deleteTask = require('../controllers/tasks/deleteTask')
const updateTask = require('../controllers/tasks/updateTask')
const findTasks = require('../controllers/tasks/findTasks')
const addUser = require('../controllers/users/addUser')
const userLogin = require('../controllers/users/userLogin')

// GET - lista
// router.get('/', controller.index)
router.get('/tarefas',validateToken, findTasks)

// POST - cadastra
router.post('/tarefas',validateToken, createTask)
router.post('/users', validateNewUser, addUser)

// DELETE
router.delete('/tarefas/:id', validateToken, deleteTask)

// PUT - atualização
router.put('/tarefas/:id', validateToken, updateTask)
router.post('/users/login', userLogin)

module.exports = router