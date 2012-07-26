"use strict";

define(function( require, exports, module ) {
	var deferred	= require( 'deferred' ),
		mediator	= require( 'mediator' ),
		server		= require( 'server' ),
		when		= Function.prototype.apply.bind( deferred.when, null );
	
	document.addEventListener( 'DOMContentLoaded', DOMready, false );
	window.addEventListener( 'load', onLoad, false );
	window.addEventListener( 'beforeunload', onBeforeUnload, false );
	
	// locals
	function DOMready() {
		mediator.emit({ name: 'DOMready' });
	}
	
	function onLoad() {
		mediator.emit({ name: 'windowLoad' });

	}
	
	function onBeforeUnload() {
		server.emit( 'close', {
			data: 'Client App Exit'
		});
	}
});