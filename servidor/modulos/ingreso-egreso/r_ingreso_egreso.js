'use strict'

const express    = require('express'),
	router       = express.Router(),
    c_ing        = require('./c_ingreso_egreso');

router
	.get('/getIngresoEgresos'    , global.ensureAuth, c_ing.getIngresoEgresos)
	.post('/updateIngresoEgreso' , global.ensureAuth, c_ing.updateIngresoEgreso)
	.post('/deleteIngresoEgreso' , global.ensureAuth, c_ing.deleteIngresoEgreso)
	.post('/insertIngresoEgreso' , global.ensureAuth, c_ing.insertIngresoEgreso)
module.exports = router;
