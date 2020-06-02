const express = require("express");
const bodyParses = require("body-parser");
const connection = require("./databese/database");
const Pergunta = require("./databese/Pergunta");
const Resposta = require("./databese/Resposta");

//fazendo conexão com o banco...
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
})

const app = express();

//Etou dizendo para o Express usar o EJS como View engine...
app.set('view engine', 'ejs');
//Adicionando aquivos estaticos, aquivos nao processados no backend (css, img, etc...)
app.use(express.static('public'));

app.use(bodyParses.urlencoded({extended: false})); // ativando bory-parses...
app.use(bodyParses.json()); //leitura de dados enviados via json...

//Crição de rota
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id','DESC'] //ASC = Crescente || DESC = Decrescente...
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
//recebendo dados do form e salvando em variáveis...
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
//passando os dados para inclusão no bando de dados...
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if (pergunta != undefined) { //Pergunta encontrada...
            res.render("pergunta", {
                pergunta : pergunta
            });
        } else { //Não encontrada...
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        resposta: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("pergunta/" + perguntaId)
    })
});


//Criação servidor...
app.listen(8080, ()=> {
    console.log("App rodando");
});


/***************************************/
// Instalação Express /ejs / bory-parses / sequelize
// npm install express --save
// npm install ejs --save
// npm install body-parser --save - Instalação bory parser para pegar dados enviados pelo form...
//npm install --save sequelize - manipulação de dados para o banco de dados...
//npm install --save mysql2 - instalação driver mysql...
