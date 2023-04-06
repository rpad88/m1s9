const yup = require("yup")

const validation = yup.object().shape({
   name: yup
      .string("O nome deve ser uma string.")
      .required("Nome é obrigatório"),
   cpf: yup
      .string("cpf deve conter 11 dígitos")
      .min(11, 'cpf deve conter 11 números')
      .max(11, 'cpf deve conter 11 números')
      .required("cpf é obrigatório"),
   password: yup
      .string("Senha deve ser string")
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
      .required("a senha é obrigatória"),
})

async function validateNewUser(req, res, next) {
   console.log("middleware validateNewUser 👌")
    try {
        await validation.validate(req.body)
        next()
    } catch (error) {
        res.status(400).json({message: error.message})
        console.error(error.message)
    }
}

module.exports = validateNewUser
