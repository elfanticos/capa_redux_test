'use strict'

const m_auth      = require('./m_auth'),
      jwt_service = require('../../config/jwt');

async function crearUsuario(req,res) {
    try {
        let data_req = req.body;
        let user =  await m_auth.crearUsuario(data_req);
        let token = jwt_service.createToken(user);
        res.status(200).send({user, token});
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            res.status(500).send({msj : 'Hubo un error'});
        }
    }
}
async function login(req,res) {
    try {
        let data_req = req.query;
        let user = await m_auth.login(data_req);
        if (!user) {
            throw {status : 400, msj : 'Usuario o clave incorrecta'};
        }
        let token = jwt_service.createToken(user);
        res.status(200).send({user, token});
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            res.status(500).send({msj : 'Hubo un error'});
        }
    }
}

async function validatorToken(req, res) {
    try {
        let token = req.query.token;
        if (!token) {
            throw {status : 400, msj : 'Acción no permitida'};
        }
        res.status(200).send({user : jwt.decode(token, JWT_KEY) , token});
    } catch (err) {
        if(err.status) {
            res.status(err.status).send(err);
        } else {
            res.status(500).send({msj : 'Hubo un error'});
        }  
    }
}

module.exports = {
    login,
    validatorToken,
    crearUsuario
};