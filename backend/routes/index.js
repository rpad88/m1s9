const express = require('express')
const router = express.Router()
const controller = require('../controller')

// GET - lista
router.get('/', controller.index)
router.get('/tarefas', controller.listarTarefas)

// POST - cadastra
router.post('/tarefas', controller.addTasks)
router.post('/users', controller.addUsers)

// DELETE
router.delete('/tarefas/:id', controller.deletaTarefa)

// PUT - atualização
router.put('/tarefas/:id', controller.atualizaTarefa)

module.exports = router