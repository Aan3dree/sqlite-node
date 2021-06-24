const sqlite3 = require('sqlite3');
const express = require('express');

//var bodyParser = require('body-parser');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('escola.db', (err) => {
    if (err) {
        console.log("Error openning Database" + err.message)
    } 
    else {
        console.log('Database connected');
    }
});

//GET ALUNO BY ID
app.get('/alunos/:id', (req, res, next) => {
    var params = [req.params.id];
    db.get(`SELECT * FROM alunos where id_aluno = ?`, [req.params.id], (err, row) => {
        if(err){
            res.status(400).json({ "error" : err.message });
            return;
        }
        res.status(200).json(row);
    });
});

//GEL ALL ALUNOS
app.get('/alunos', (req, res, next) => {
    db.all('SELECT * FROM alunos', [], (err, rows) => {
        if(err){
            res.status(400).json({ "error" : err.message });
            return;
        }
        res.status(200).json({rows});
    });
});


app.post('/alunos/', (req, res) => {
    var data = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
    }
    const sql = "INSERT INTO alunos (nome, email, telefone) VALUES (?, ?, ?)";
    const aluno = [data.nome, data.email, data.telefone];

    db.run(sql, aluno, function (err, result) {
        if(err){
            res.status(400).json({ "error" : err.message });
            return;
        }
        res.status(201).json({
            "id_aluno" : this.lastID
        })
    });
});

//put metodo
app.post('/alunos/:id', (req, res) => {
    var data = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
    }
    const id = req.params.id_aluno;
    const sql = "UPDATE ALUNOS SET nome = ?, email = ?, telefone = ? WHERE (id_aluno = ?)";
    db.run(sql, [data.name, data.email, data.telefone, id],
    function (err, result) {
        if(err){
            res.status(400).json({ 'error' : err.message })
            return;
        }
        res.json({ 
            message : "success",
            data: data,
            changes: this.changes
        });
    });
});

//delete
app.delete('/alunos/:id', (req, res, next) => {
    db.run(`DELETE FROM alunos WHERE id_aluno = ?`,
    req.params.id,
    function (err, result) {
        if (err) {
            res.status(400).json({ 'error' : err.message});
            return ;
        }
        res.status(200).json({ deletedID : this.changes });
    });
});