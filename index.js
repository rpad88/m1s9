require('dotenv').config()
const express = require('express')
const rotas = require('./backend/routes')
const connection = require('./src/database')
const log = require('./src/middlewares/log')


const app = express()
app.use(express.json()) //Obrigatório
app.use(log) //passa a utilizar o MIDDLEWARE global log

const listaDeRotas = [
    '/tarefas',
    '/users',
    '/users/login'
]

connection.authenticate()
connection.sync({alter: true})
console.log('Connection has been stablished sucessfully')


app.use(listaDeRotas, rotas)

app.listen(3333, () => console.log('Aplicação online 🏃‍♂️'))