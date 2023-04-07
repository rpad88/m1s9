const { Sequelize } = require("sequelize");
const connection = require("../database");
const User = require("./User");

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
    },

    user_id: {
        type: Sequelize.INTEGER
    }
})

Task.belongsTo(User) //foreign key, default name = User_id | model_id
// Task.belongsTo(User, {foreignKey: 'usuario_id' }) *Caso queira escolher o nome da coluna

module.exports = Task