var assert = require('assert');
var Crunch = require('../');
var redis = require('redis');
var async = require('async');

describe('Crunch', function() {

	describe('#Crunch Hooks()', function() {
		it('should run hooks when they are provided.', function(done) {
			var channel = 'testingCrunchHooks';
			var expectedMessage = 'expectedMessage';
			var messageHappened = false;
			var hooks = {};
			hooks.subscribe = function () {
				console.log('hook subscribed');
			};
			
			hooks.unsubscribe = function () {
				console.log('hook unsubscribed');
			};
			hooks.message = function (message) {
				console.log('%%%%%%%%%%%');
				assert(message === expectedMessage);
				messageHappened = true;
				testClient.stop();
				done();
			};
			
			var crunch = Crunch.createInstance({ channel: channel, hooks: hooks });
			crunch.start();
			
			var testClient = redis.createClient();
			
			testClient.publish(channel, expectedMessage);
		})
	})
})