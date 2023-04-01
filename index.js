require('dotenv').config()
const express = require('express')
const rotas = require('./backend/routes')
const connection = require('./src/database')


const app = express()
app.use(express.json()) //Obrigatório

const listaDeRotas = [
    '/',
    '/tarefas',
]

connection.authenticate()
connection.sync()
console.log('Connection has been stablished sucessfully')


app.use(listaDeRotas, rotas)

app.listen(3333, () => console.log('Aplicação online 🏃‍♂️'))