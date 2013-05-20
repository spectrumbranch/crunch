

var crunch = {};
crunch.bootstrap = require('./bootstrap');
crunch.redis = crunch.bootstrap.redis;
crunch.client = crunch.bootstrap.client;

module.exports = crunch;