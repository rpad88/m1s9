async function createTask(req, res) {
    try {
       if (!req.body.name) {
          return res.status(401).json({ error: "https://http.cat/401" })
       }

       const tarefa = {
          name: req.body.name,
          description: req.body.description,
          user_id: req.body.user_id
       }

       // verifica se o nome já existe
       const contains = await Task.findOne({ where: { name: tarefa.name } })
       if (!contains) {
          const newTask = await Task.create(tarefa)

          // res.json => retorna um JSON
          // res.send => retorna HTML
          res.status(201).json(newTask)
       } else {
          res.status(400).json({ error: `${tarefa.name} already exists` })
       }
    } catch (error) {
       console.log(error.message)
       res.status(500).json({
          message: "Não conseguimos processar a sua requisição.",
       })
    }
 }

 module.exports = createTask