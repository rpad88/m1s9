const Sequelize = require('sequelize')

const connection = new Sequelize({
    dialect: 'postgres', //qual o banco que vai se conectar
    host: 'localhost', //onde o banco está ?
    username: 'postgres',
    password: process.env.USER_PWD, //senha salva no arquivo .env
    database: 'tarefas_db', //nome do banco
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    },
})

module.exports = connection