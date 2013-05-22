

var crunch = {};
crunch.bootstrap = require('./bootstrap');
crunch.lobbby = require('./lobby');
crunch.redis = crunch.bootstrap.redis;
crunch.client = crunch.bootstrap.client;

module.exports = crunch;