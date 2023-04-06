const express = require('express')
const router = express.Router()
const controller = require('../controller')

// MIDDLEWARES
const validateNewUser = require('../../src/middlewares/validate-new-user')

// GET - lista
router.get('/', controller.index)
router.get('/tarefas', controller.listarTarefas)

// POST - cadastra
router.post('/tarefas', controller.addTasks)
router.post('/users', validateNewUser, controller.addUsers)

// DELETE
router.delete('/tarefas/:id', controller.deletaTarefa)

// PUT - atualização
router.put('/tarefas/:id', controller.atualizaTarefa)
router.post('/users/login', controller.login)

module.exports = router