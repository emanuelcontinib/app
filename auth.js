const bcrypt = require('bcrypt')
var md5 = require("md5")
const LocalStrategy = require('passport-local').Strategy
var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err)
    }
});

module.exports = () => {
    passport.use(new LocalStrategy(
        function (user, password, done) {
            db.get("select * from users where user = ? and password = ?", [user, md5(password)], (err, row) => {
                if (err) {
                    res.status(400).json({
                        "error": err.message
                    });
                    return done(err);
                }
                return done(null, user);
            });
        }
    ));
}