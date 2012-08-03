(function _initMain() {
	"use strict";
	
	requirejs.config({
		baseUrl: '/js/modules',
		paths: {
			app: '../app'
		}
	});
	
	require([	'es5shim',
				'tools',
				'domready',
				'GUI/window',
				'GUI/header',
				'GUI/content' ], main );
				
	function main( es5, tools, domReady, mWindow, mHeader, mContent ) {
		console.log('app entry point');
		
		domReady(function( doc ) {
			console.log('domReady, loading GUI modules...');
			
			mWindow.init();
			mHeader.init();
			mContent.init();
		});
	}
}());