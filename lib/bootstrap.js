
var internals = {};

internals.initialize = function() {
	var redis = require("redis"),
        client = redis.createClient();
		
	internals.redis = redis;
	internals.client = client;
		
	var namespace = "crunchdev"; 	//TODO to config
	var tickfrequency = "1000";		//TODO to config
	
	var qb = require("./querybuilder");
	qb.useNamespace(namespace);
	
	
	
	internals.client.get(qb.getStatus(), function(err, reply) {
		// reply is null when the key is missing
		console.log(reply);
		if (reply === "null" || reply === "offline" || reply !== "online") {
			//Doesn't exist. Probably no other servers running using this namespace. This is a normal boot
			console.log("Doesn't exist");
			internals.client.set("namespace", namespace, internals.redis.print);
			internals.client.set(qb.getStatus(), "booting", internals.redis.print);
			internals.client.set(qb.getTickFrequency(), tickfrequency, internals.redis.print);
			
			
			
					

			//keep moving cleanup until we get to a point where we actually need it
			internals.cleanup(namespace);
		} else {
			//A server already exists using this namespace. We're not doing anything yet with this.
			console.log("exists");
			//TODO: do something meaningful here.
			process.exit();
		}
	});
}

//TODO: move out to some cleanup module
internals.cleanup = function(namespace) {
	var qb = require("./querybuilder");
	qb.useNamespace(namespace);
	
	internals.client.set("namespace", "", internals.redis.print);
	internals.client.set(qb.getStatus(), "offline", internals.redis.print);
	internals.client.set(qb.getTickFrequency(), "", internals.redis.print);
	
	internals.client.quit(function() {
		console.log("Exiting via cleanup.");
		process.exit();
	});
}

module.exports = internals.initialize;