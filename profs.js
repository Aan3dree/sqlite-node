const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('escola.db');

//Retrieve all rows
db.all('SELECT id_professor, name, email, telefone, disciplina FROM professores', (err, rows) => {
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
