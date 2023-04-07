# Lab365
Conteúdo das aulas do Módulo 1 Semana 10

### Build with
- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/) - Framework para o desenvolvimento de aplicações JavaScript com o Node.js.
- [Sequelize](https://sequelize.org/) - O Sequelize abstrai os comandos de operações de SQL, e faz com que possamos usar linguagem de programação que já estamos usando no backend
- [Postgre SQL](https://www.postgresql.org/) - Banco de dados
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografa as senhas
- [yup](https://www.npmjs.com/package/yup) - Validação de parâmetros recebidos na API
- [jwt](https://jwt.io/) - Tem como objetivo transmitir ou armazenar de forma compacta e segura objetos JSON entre diferentes aplicações

### Important functions

```JS
// CRIPTOGRAFIA DA SENHA INFORMADA PELO USER
// função utilizada no model User.js
User.beforeSave(async (user) => {
    if(user.changed('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
    }
})
```

```JS
//VALIDAÇÃO DE TOKEN JWT
// utilizado no middleware
function validateToken(req, res, next) {
    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) return res.status(403).json({message: 'token ausente'})
     
    const tokenJwt = token.slice(7)

    jwt.verify(tokenJwt, process.env.TOKEN_PWD, (error, conteudoDoToken) => {
        if(error) {
            if(error.name === "TokenExpiredError") return res.status(403).json({message: 'Token expirado'})
            if(error.name === "JsonWebTokenError") return res.status(403).json({message: 'Token invalido'})
        }
        next()
    })
}

```
```JS
// VALIDAÇÃO DE ATRIBUTOS COM YUP
// feita no middleware de validação de cadastro
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
```