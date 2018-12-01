'use strict'
const pgp  = require("pg-promise")(),
      db   = pgp("postgres://postgres:postgres@localhost:5432/egreso_ingreso"),
      port = process.env.PORT || 3000,
      app  = require('./app');
/**Conectar con  db */
db.connect();
/**Iniciar servidor */
app.listen(port, function() {
	console.log(`Iniciando Express en el puerto ${port}`);
});

exports.conection = db;
exports.pgpromise = pgp;