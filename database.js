var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
      if (err) {

            console.error(err.message)

            throw err
      } else {
            console.log('Connected to the SQLite database.')

            db.run(`PRAGMA foreign_keys = ON;`);

            db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
                  (err) => {
                        if (err) {
                              // Table already created
                        } else {
                              // Table just created, creating some rows
                              var insert = 'INSERT INTO user (email, password) VALUES (?,?)'
                              db.run(insert, ["admin.com", md5("admin123456")])
                              db.run(insert, ["user@example.com", md5("user123456")])

                        }
                  });

            db.run(`CREATE TABLE sureg (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        city text, 
                        uf text,
                        name text UNIQUE,
                        userId INTEGER,
                        ufId INTEGER,
                        FOREIGN KEY (userId) REFERENCES user(id)
                        );`,
                  (err) => {
                        if (err) {
                              // Table already created
                              console.log(err);
                        } else {
                              // Table just created, creating some rows
                              var insert = 'INSERT INTO sureg ( city, uf, name) VALUES (?,?,?)'
                              db.run(insert, ["ERECHIM", "RS","FRONTEIRA"])
                              db.run(insert, ["CAXIAS DO SUL", "RS","VALE DOS SINOS"])
                        }
                  });

            db.run(`CREATE TABLE printer (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  model text, 
                  serial text, 
                  suregId INTEGER,
                        CONSTRAINT fk_sureg 
                        FOREIGN KEY (suregId) 
                        REFERENCES sureg(id)
                        ON DELETE CASCADE
                        );`,
                  (err) => {
                        if (err) {
                              // Table already created
                              console.log('====================================');
                              console.log(err);
                              console.log('====================================');

                        } else {
                              // Table just created, creating some rows
                              var insert = 'INSERT INTO printer (model, serial) VALUES (?,?)'
                              db.run(insert, ["HP - 480", "3h5u43htu3h4uh"])
                              db.run(insert, ["Samsumg - 541", "3h5u43htu3h4uh"])
                        }
                  });
      }
});


module.exports = db