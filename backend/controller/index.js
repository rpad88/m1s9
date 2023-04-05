const Task = require("../../src/models/Task")
const User = require("../../src/models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
   index: (req, res) => {
      res.status(203).send({ mensagem: "Bem Vindo" })
   },
   // Cadastrar uma nova tarefa
   addTasks: async (req, res) => {
      try {
         if (!req.body.name) {
            return res.status(401).json({ error: "https://http.cat/401" })
         }

         const tarefa = {
            name: req.body.name,
            description: req.body.description,
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
   },
   listarTarefas: async (req, res) => {
      const allTasks = await Task.findAll()
      console.log(allTasks)
      res.status(200).json(allTasks)
   },
   deletaTarefa: async (req, res) => {
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
   },
   atualizaTarefa: async (req, res) => {
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
   },
   // USERS
   addUsers: async (req, res) => {
      const { id, name, cpf, password } = req.body
      if (!name || !cpf || !password)
         return res.status(401).json({ message: "Name/CPF/Password mandatory" })

      try {
         // CRIPTOGRAFIA
         //    const hash = await bcrypt.hash(req.body.password, 10)

         const newUser = {
            name: req.body.name,
            cpf: req.body.cpf,
            password: req.body.password,
         }

         const cpfInDatabase = await User.findOne({
            where: { cpf: newUser.cpf },
         })
         if (!cpfInDatabase) {
            // ADICIONANDO AO BANCO DE DADOS
            const user = await User.create(newUser)
            //user.password = "******"; //Ocultando a senha e a hash.
            const { password, ...rest } = user.toJSON()
            res.status(201).json(rest)
         } else {
            res.status(400).json({ error: `this CPF already exists` })
         }
      } catch (error) {
         console.error(error.message)
         res.status(500).json({
            message: "Não conseguimos processar a sua requisição.",
         })
      }
   },
   login: async (req, res) => {
      try {
         const userInDatabase = await User.findOne({
            where: { cpf: req.body.cpf },
         })

         if (!userInDatabase)
            return res.status(404).json({ message: "credenciais incorretas" })

         // compara senha informada com a senha criptografada no banco de dados
         const passwordIsValid = await bcrypt.compare(
            req.body.password,
            userInDatabase.password
         ) //return true or false

         if (!passwordIsValid)
            return res.status(404).json({ message: "credenciais incorretas" })

         const token = jwt.sign(
            { id: userInDatabase.id },
            process.env.TOKEN_PWD, //CHAVE
            { expiresIn: "1h" } //1h = 1 hora | 1d = 1 dia
         )

         res.status(200).json({ name: userInDatabase.name, token: token })
      } catch (error) {
         console.error(error.message)
         res.status(500).json({
            message: "Não conseguimos processar a sua requisição.",
         })
      }
   },
}
