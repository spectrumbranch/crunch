var assert = require('assert');
var Crunch = require('../');
var redis = require('redis');
var async = require('async');

describe('Crunch', function() {

	describe('#Crunch Hooks()', function() {
		it('should run hooks when they are provided.', function(done) {
			var channel = 'testingCrunchHooks';
			var expectedMessage = 'expectedMessage';
			var hooks = {};
			hooks.subscribe = function () {
				console.log('hook subscribed');
			};
			
			hooks.unsubscribe = function () {
				console.log('hook unsubscribed');
			};
			hooks.message = function (message) {
				assert(message === expectedMessage);
				testClient.end();
				crunch.stop();
				assert(!crunch.started);
				done();
			};
			
			var crunch = Crunch.createInstance({ channel: channel, hooks: hooks });
			crunch.start();
			assert(crunch.started);
			
			var testClient = redis.createClient();
			
			testClient.publish(channel, expectedMessage);
		})
	})
})