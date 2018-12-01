'use strict'

const m_ing = require('./m_ingreso_egreso');

async function getIngresoEgresos(req, res) {
    try {
        let data = await m_ing.getIngresoEgresos(req.query.id_persona);
        res.status(200).send(data);
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            res.status(500).send({msj : 'Hubo un error'});
        }
    }
}

async function insertIngresoEgreso(req, res) {
    try {
        let data_req = req.body.item;
        let data = await m_ing.insertIngresoEgreso(data_req);
        res.status(200).send(data);
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            res.status(500).send({msj : 'Hubo un error'});
        }
    }
}

async function updateIngresoEgreso(req, res) {
    try {
        let data_req = req.body;
        let data = await m_ing.updateIngresoEgreso(data_req);
        res.status(200).send(data);
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            res.status(500).send({msj : 'Hubo un error'});
        }
    }
}

async function deleteIngresoEgreso(req, res) {
    try {
        let data_req = req.body;
        let data = await m_ing.deleteIngresoEgreso(data_req.id);
        res.status(200).send(data);
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            res.status(500).send({msj : 'Hubo un error'});
        }
    }
}

module.exports = {
    getIngresoEgresos,
    insertIngresoEgreso,
    updateIngresoEgreso,
    deleteIngresoEgreso
};