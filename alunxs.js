const sqlite3 = require('sqlite3').verbose();

//open the database
let db = new sqlite3.Database('C:/Users/andre.silva.de.souza/escola.db', sqlite3.OPEN_READWRITE,(err) => {
    if (err){
        return console.log(err.message);
    }
    console.log('Connected to the SQlite database');
});

//db.run(`INSERT INTO alunos VALUES(3, 'João Luiz', 'joao.luiz@gmail.com', '974364475')`);
 
db.serialize(() => {
    //console.log('Id' + '\t' + 'Nome');
    db.each(
        `SELECT id_aluno as id,
            name as nome
        FROM alunos    
        `, (err, row) => {
            if(err){
                console.log(err.message);
            }
            console.log(row.id + "\t" + row.nome);
        });
});


db.close((err) => {
    if (err){
        return console.log(err.message);
    }
    console.log('Close the database connection');
});