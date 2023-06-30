var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(flash());


app.get("/", (req, res) => {
    res.render('index');
})

app.post("/form",(req, res) => {
    var {email, nome, pontos} = req.body;

    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio";
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 ponto";
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio";
    }

    if(nome.length < 4){
        nomeError = "O nome é mt pequeno";
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        res.redirect("/");
    }else{
        res.send("AI SIM CARA !");
    }
})
    

app.listen(2023,(req,res) => {
    console.log('Servidor Rodando');
})