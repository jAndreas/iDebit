"use strict";

requirejs.config({
	baseUrl: 'js/modules',
	paths: {
		app: '../app'
	}
});

require([ 'es5shim', 'tools' ], function() {
	console.log('app entry point');
	
	require([ 'domready!' ], function( doc ) {
		console.log('domReady, loading GUI modules...');
		require([ 'GUI/window', 'GUI/header', 'GUI/content' ]);
	});
});