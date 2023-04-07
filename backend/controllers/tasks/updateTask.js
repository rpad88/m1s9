const Task = require("../../../src/models/Task")

async function updateTask (req, res) {
    if (!req.params.id)
       return res.status(406).json({ message: "ID necessário" })
    try {
       // melhor que o findOne()
       const taskInDatabase = await Task.findByPk(req.params.id)
       if (!taskInDatabase)
          return res.status(404).json({ message: "tarefa não encontrada" })

       taskInDatabase.name = req.body.name || taskInDatabase.name
       taskInDatabase.description =
          req.body.description || taskInDatabase.description

       await taskInDatabase.save() //UPDATE
       res.json(taskInDatabase)
    } catch (error) {
       console.error("Erro ao atualizar: ", error)
    }
 }

 module.exports = updateTask