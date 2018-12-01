'use strict'
const jwt    = require('jwt-simple'),
      moment = require('moment');


global.ensureAuth = function(req, res, next) {
    let referer = null;
    referer = req.headers.referer;
    if(!referer) {
        return res.status(400).send({message: 'La petición no tiene referer', error: 2});
    }
    let char = '//';
    let idx  = referer.indexOf(char);
    referer  = referer.substring( (idx + char.length), referer.length);
    referer  = referer.split('/')[1];
    let token = (req.body.token) ? req.body.token : (req.query.token ? req.query.token : req.headers.authorization ? req.headers.authorization : null);
    if(token == null) {
        return res.status(400).send({message: 'La petición no tiene la cabecera de autenticación', error: 2});
    }
    let payload = null;
    token = token.replace(/['"]+/g,'');
    try {
        let segments = token.split('.');
        if (segments.length !== 3) {
            throw new Error('El token no tiene el formato correcto');
        }
        payload = jwt.decode(token, JWT_KEY);
        if(payload.exp == undefined || payload.exp <= moment().unix()){
            //return res.status(200).send({message: 'Token ha expirado', error: 2});
        }
    } catch (err) {
        return res.status(400).send({message: 'Token no válido', error: err});
    }
    req.user = payload;
    next();
}