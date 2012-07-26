"use strict";

define(function( require, exports, module ) {
	var deferred	= require( 'deferred' );
		
	var Public		= Object.create( null ),
		socket		= io.connect('http://typeofnan.com:80/');
		
	socket.on( 'connect', doConnect );
	
	Public.emit = function emit() {
		socket.emit.apply( socket, arguments );
	};
	
	Public.on = function on() {
		socket.on.apply( socket, arguments );
	};
	
	Public.once = function once() {
		socket.once.apply( socket, arguments );
	};
	
	return Public;
	
	// locals
	function doConnect() {
		socket.on( 'ACK', onAck );
		
		// locals
		function onAck( msg ) {
			//alert('server says: ' + msg);
		}
	}
});