const Sequelize = require('sequelize');

//Criando conexão com o banco de dados...
const connection = new Sequelize('guiaperguntas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//exportando conexão... 
module.exports = connection;