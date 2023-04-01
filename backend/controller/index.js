const Task = require('../../src/models/Task')

module.exports = {
    index: (req, res) => {
        res.status(203).send({mensagem: "Bem Vindo"})
    },
    // Cadastrar uma nova tarefa
    cadastrarTarefa: async (req, res) => {
        try {
            if(!req.body.name) {
                return res.status(401).json({error: "https://http.cat/401"})
            }
            
            const tarefa = {
                name: req.body.name,
                description: req.body.description
            }
            
            // verifica se o nome já existe
            const contains = await Task.findOne({where: {name: tarefa.name}})
            if(!contains) {
                const newTask = await Task.create(tarefa)
        
                // res.json => retorna um JSON
                // res.send => retorna HTML
                res.status(201).json(newTask)
            } else {
                res.status(400).json({error: `${tarefa.name} already exists`})
            }
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({message: 'Não conseguimos processar a sua requisição.'})
        }
    },
    listarTarefas: async (req,res) => {
        const allTasks = await Task.findAll()
        console.log(allTasks);
        res.status(200).json(allTasks)
    },
    deletaTarefa: async (req, res) => {
        if(!req.params.id) return res.status(406).json({message: 'ID necessário'})
        try {
            // DELETE FROM Task WHERE id=req.params
            await Task.destroy(
                {where: 
                    {id: req.params.id},
                    force: true
                })
                // status 204 não permite mensagem.
            res.status(200).json({message: 'Deletado com sucesso'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Não conseguimos processar a sua requisição."})            
        }
    }
}