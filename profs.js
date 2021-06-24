const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('escola.db');

db.run(`INSERT INTO professores VALUES
    (2, 'Silva Holand', 'silva@holand.com', '988772244', 'Intenligencia Artificial'),
    (3, 'Joseph Elis', 'joseph@elis.com', '978775542', 'Tibia'),
    (4, 'Merlin Santos', 'merlin@santos.com', '977554466', 'Magia')`);

//Retrieve all rows
db.all('SELECT id_professor, name, email, telefone, disciplina FROM professores', (err, rows) => {
    if (err){
        return console.log(err.message);
    }
    rows.forEach((row) => {
        console.log(
            row.id_professor +
            '\t' +
            row.name +
            '\t' +
            row.email +
            '\t' +
            row.telefone +
            '\t' +
            row.disciplina
        );
    })
});
