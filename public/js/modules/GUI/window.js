define([ 'deferred', 'mediator', 'server', 'tools' ], function( deferred, mediator, server, tools ) {
	"use strict";

	var Public	= Object.create( null ),
		when	= Function.prototype.apply.bind( deferred.when, null );
	
	tools.mix( Public ).with({
		init:		init,
		destroy:	destroy
	});
	
	return Public;
	
	// -- local helpers --
	function init() {
		console.log( 'window.js init' );
	
		window.addEventListener( 'load', onLoad, false );
		window.addEventListener( 'beforeunload', onBeforeUnload, false );
	}
	
	function destroy() {
	}
	
	function onLoad() {
		mediator.emit( 'windowLoad' );

	}
	
	function onBeforeUnload() {
		server.emit( 'close', {
			data: 'Client App Exit'
		});
	}
});