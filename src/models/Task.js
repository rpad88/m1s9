const { Sequelize } = require("sequelize");
const connection = require("../database");

// Modelo de como será nossa tabela no banco
const Task = connection.define('tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = Task