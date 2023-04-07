const User = require("../../../src/models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function userLogin (req, res) {
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
 }

 module.exports = userLogin