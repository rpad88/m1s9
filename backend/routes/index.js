const express = require('express')
const router = express.Router()
const controller = require('../controller')

// GET
router.get('/', controller.index)
router.get('/tarefas', controller.listarTarefas)

// POST
router.post('/tarefas', controller.cadastrarTarefa)

// DELETE
router.delete('/tarefas/:id', controller.deletaTarefa)

module.exports = router