'use strict'

const express    = require('express'),
	router       = express.Router(),
    c_auth       = require('./c_auth');

router
	.get('/login', c_auth.login)
	.get('/validatorToken', global.ensureAuth, c_auth.validatorToken)
	.post('/crearUsuario', c_auth.crearUsuario)
module.exports = router;
