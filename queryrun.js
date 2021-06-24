const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('escola.db');

db.run(`ALTER TABLE alunos MODIFY id_aluno INT AUTO_INCREMENT PRIMARY KEY`, (err) => {
    console.log(err.message);
});