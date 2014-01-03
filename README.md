crunch
======

v0.1.0

A queue crunching state machine.
This project is still pretty young.


[![Build Status](https://api.travis-ci.org/spectrumbranch/crunch.png)](https://travis-ci.org/spectrumbranch/crunch)


Developers
==========

To obtain and install, run: 

```
git clone git@github.com:spectrumbranch/crunch.git
cd crunch
npm install
```

To run tests:

```
make test
```

Usage
-----

To use crunch as a subscriber router/relay:

```
var Crunch = require('crunch');

var relay = {};

//These relay functions are where you put your custom logic.
relay.subscribe = function () {
	console.log('Will show when subscribed.');
}

relay.unsubscribe = function () {
	console.log('Will show when unsubscribing.');
}

relay.message = function (message) {
	console.log('The message sent on this channel is ' + message);
}
var crunch = Crunch.createInstance({ channel: 'myChannel', hooks: relay });

//Start listening
crunch.start();

//Use a redis client to publish some messages to the 'myChannel' channel.
//Do some work

//To end the process
crunch.stop();
```

Early Phase Requirements
------------------------

-Specify a channel with configuration for crunch to sub/pub to on redis. This gives the channel namespace a prefix of `crunch:channelname:`

-Messages are expected to be sent in valid parseable JSON. Both direct (value filled) and deferred (provides a 'memory address'-like redis key for another message) messages are understood.

__Example messages (aka command sets):__

A direct message:  
```{"cmd":"update", "type":"Tile", "x":0, "y": 16, "layer": 1, "tileid": 17, "mapid": 3, "lastChangedBy": 7 }```

A deferred message:  
```{"cmd":"queue", "key":"tileQueue01234"}```
