define([ 'guitools', 'deferred', 'mediator', 'tools' ], function( guiTools, deferred, mediator, tools ) {
	"use strict";
		
	var Public		= Object.create( null ),
		By			= guiTools.By,
		nodes;
		
	tools.mix( Public ).with({
		init:		init,
		destroy:	destroy
	});
	
	return Public;
		
	// -- local helpers --	
	function init() {
		console.log( 'header.js init' );
		
		nodes = guiTools.cacheNodes( By.class( 'header' )[ 0 ] );
	}
	
	function destroy() {
	}
});