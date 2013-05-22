var crunch = require('./lib');
var async = require('async');
//TODO: async this properly

//initialize system
console.log("Bootstrapping system setup.")
crunch.bootstrap(function() {
	console.log("System bootstrap complete.");
	console.log("System entering lobby mode.")
	crunch.lobby(function() {
		console.log("Lobby is up.");
	}
});

//console.log("System entering lobby mode.");
//wait for at least 2 players to connect
//TODO; crunch.lobby();