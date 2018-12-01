'use strict'
var db = require('../../index');

function crearUsuario(data) {
    return new Promise((resolve,reject)=> {
        let sql =`INSERT 
                    INTO persona
                         (nom_persona, ape_pate_pers,ape_mate_pers,nro_documento,usuario,clave)
                  VALUES ($1,$2,$3,$4,$5,$6)
               RETURNING id_persona,
                         nom_persona,
                         ape_pate_pers,
                         ape_mate_pers,
                         nro_documento,
                         foto_persona`;
        sql = db.pgpromise.as.format(sql,[data.nom_persona, data.ape_pate_pers,data.ape_mate_pers,data.nro_documento,data.usuario,data.clave]);
        db.conection.result(sql).then(result => {
            if (result.rowCount == 0) return reject({msj : 'No se pudo crear el usuario'});
            resolve(result.rows[0]);
        }).catch(err => {
            reject(err);
        });
    });
}
function login(data) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT id_persona,
                          nom_persona,
                          ape_pate_pers,
                          ape_mate_pers,
                          nro_documento,
                          foto_persona
                     FROM persona
                    WHERE usuario = UNACCENT(LOWER($1))
                      AND clave   = $2`;
        sql = db.pgpromise.as.format(sql,[data.usuario, data.clave]);
        db.conection.any(sql).then(result => {
            resolve(result[0]);
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    login,
    crearUsuario
}