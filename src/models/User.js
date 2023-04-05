const { Sequelize } = require("sequelize");
const connection = require("../database");
const bcrypt = require('bcrypt')

const User = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.beforeSave(async (user) => {
    if(user.changed('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
    }
})

module.exports = User