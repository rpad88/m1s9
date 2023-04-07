const Task = require("../../../src/models/Task")

async function deleteTask(req, res) {
    if (!req.params.id)
       return res.status(406).json({ message: "ID necessário" })
    try {
       // DELETE FROM Task WHERE id=req.params
       await Task.destroy({ where: { id: req.params.id }, force: true })
       // status 204 não permite mensagem.
       res.status(200).json({ message: "Deletado com sucesso" })
    } catch (error) {
       console.log(error)
       res.status(500).json({
          message: "Não conseguimos processar a sua requisição.",
       })
    }
 }
 module.exports = deleteTask