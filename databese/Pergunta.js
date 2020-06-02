const Sequelize = require("sequelize");
const connection = require("./database");

//Será criado tabela no banco de dados...
const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Sincronização com o bando de dados.
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;