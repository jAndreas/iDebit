define(function( require, exports, module ) {
	"use strict";

	var guiTools	= require( 'guitools' ),
		deferred	= require( 'deferred' ),
		mediator	= require( 'mediator' );
		
	var Public		= Object.create( null ),
		nodes		= guiTools.cacheNodes( By.className( 'header' )[ 0 ] );
		
	//console.log('Hi I am header, my rootNode is: ', rootNode);
});