const sqlite3 = require('sqlite3');
const express = require('express');
const path = require('path');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

const db_path = path.join(__dirname, 'data', 'escola.db');
const db = new sqlite3.Database(db_path, (err) => {
    if (err) {
        console.log("Error openning Database" + err.message)
    } 
    else {
        console.log('Database connected');
    }
});

app.get('/sobre', (req, res) => {
    res.render('about');
});

app.get('/dados', (req, res) => {
    const test = {
        title: 'Test',
        items: ['um','dois','tres']
    };
    res.render('data', { model: test});
});

//GET /edit/:id
app.get('/edit/:id', (req, res) => {
    var params = [req.params.id];
    var sql = 'SELECT * FROM alunos where id_aluno = ?'
    db.get(sql, params, (err, row) => {
        if(err){
            res.status(400).json({ "error" : err.message });
            return;
        }
        res.render('edit', { model: row });
        //res.status(200).json(row);
    });
});

//GEL ALL ALUNOS
app.get('/alunos', (req, res) => {

    db.all('SELECT * FROM alunos', [], (err, rows) => {
        if(err){
            res.status(400).json({ "error" : err.message });
            return;
        }
        res.render('alunos', { model: rows});
        //res.status(200).json({rows});
    });
});

//GET /add
app.get('/add', (req, res) => {
    res.render('add', { model: {} });
});

//GET /delete/:id
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM alunos WHERE id_aluno = ?';
    db.get(sql, id, (err, row) => {
        if(err){
            res.status(400).json({ 'error': err.message });
            return;
        }
        res.render('delete', { model: row });
    });
});

//POST /add
app.post('/add', (req, res) => {
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
        res.redirect('alunos');
        /** 
        res.status(201).json({
            "id_aluno" : this.lastID
        })
        */
    });
});

//POST /edit/:id
app.post('/edit/:id', (req, res) => {
    var data = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
    }
    const id = req.params.id;
    const sql = "UPDATE alunos SET nome = ?, email = ?, telefone = ? WHERE (id_aluno = ?)";
    db.run(sql, [data.nome, data.email, data.telefone, id],
    function (err, result) {
        if(err){
            //console.log(res);
            res.status(400).json({ 'error' : err.message })
            return;
        }
        //console.log(res + 'suces');
        res.redirect('/alunos');
        /**
        res.json({ 
            message : "success",
            data: data,
            changes: this.changes
        });
         */
    });
});

//POST /delete/:id
app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM alunos WHERE id_aluno = ?';
    db.run(sql, id, function(err, result){
        if(err){
            res.status(400).json({'error': err.message});
            return;
        }
        res.redirect('/alunos');
    });
})

//DELETE method -> nao to usando nesse front
app.delete('/alunos/:id', (req, res) => {
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