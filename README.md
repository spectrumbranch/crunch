crunch
======

A queue crunching state machine.
This project is in an infant stage. We'll call it 0.0.0 until it at least does something.

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


Early Phase Requirements
------------------------

-Specify a channel with configuration for crunch to sub/pub to on redis. This gives the channel namespace a prefix of `crunch:channelname:`

-Messages are expected to be sent in valid parseable JSON. Both direct (value filled) and deferred (provides a 'memory address'-like redis key for another message) messages are understood.

__Example messages (aka command sets):__

A direct message:  
```{"cmd":"update", "type":"Tile", "x":0, "y": 16, "layer": 1, "tileid": 17, "mapid": 3, "lastChangedBy": 7 }```

A deferred message:  
```{"cmd":"queue", "key":"tileQueue01234"}```
