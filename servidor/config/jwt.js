'use strict'
require('../config/constant')
var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(metadata){
    metadata.iap = moment().unix();
    metadata.exp = moment().add(30, 'days').unix();
    return jwt.encode(metadata, global.JWT_KEY);
};