'use strict'
var db = require('../../index');
function getIngresoEgresos(id_persona) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT descripcion,
                          monto,
                          tipo,
                          id
                     FROM movimiento
                    WHERE _id_persona = $1`;
        sql = db.pgpromise.as.format(sql,[id_persona]);
        db.conection.any(sql).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        });
    });
}

function insertIngresoEgreso(data) {
    return new Promise((resolve,reject) => {
        let sql =`INSERT 
                    INTO movimiento
                         (descripcion,monto,tipo, _id_persona)
                  VALUES ($1,$2,$3,$4)
               RETURNING id,
                         descripcion,
                         monto,
                         tipo`;
        sql = db.pgpromise.as.format(sql,[data.descripcion, data.monto, data.tipo, data._id_persona]);
        db.conection.result(sql).then(result => {
            if (result.rowCount == 0) return reject({msj : 'No se pudo insertar'});
            resolve({msj : 'Se insertó', data : result.rows[0]});
        }).catch(err => {
            reject(err);
        });
    });
}

function updateIngresoEgreso(data) {
    return new Promise((resolve,reject) => {
        let sql =`UPDATE movimiento
                     SET descripcion = $2,
                         monto       = $3,
                         tipo        = $4
                  WHERE id           = $1`;
        sql = db.pgpromise.as.format(sql,[data.id, data.descripcion, data.monto, data.tipo]);
        db.conection.result(sql).then(result => {
            if (result.rowCount == 0) return reject({msj : 'No se pudo actulizar'});
            resolve({msj : 'Se actualó'});
        }).catch(err => {
            reject(err);
        });
    });
}

function deleteIngresoEgreso(id) {
    return new Promise((resolve,reject) => {
        let sql =`DELETE 
                    FROM movimiento
                   WHERE id = $1`;
        sql = db.pgpromise.as.format(sql,[id]);
        db.conection.result(sql).then(result => {
            if (result.rowCount == 0) return reject({msj : 'No se pudo eliminar'});
            resolve({msj : 'Se eliminó'});
        }).catch(err => {
            reject(err);
        });
    });
}
module.exports = {
    getIngresoEgresos,
    insertIngresoEgreso,
    updateIngresoEgreso,
    deleteIngresoEgreso
}