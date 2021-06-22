const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('escola.db', sqlite3.OPEN_READWRITE,(err) => {
    if (err){
        return console.log(err.message);
    }
    console.log('Connected to the SQlite database');
});

db.close((err) => {
    if (err){
        return console.log(err.message);
    }
    console.log('Close the database connection');
});