const User = require("../../../src/models/User")

async function addUser (req, res) {
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
 }

 module.exports = addUser