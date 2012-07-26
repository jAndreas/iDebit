define(function() {
	"use strict";
	
	var toStr		= Object.prototype.toString,
		slice		= Array.prototype.slice,
		lastError	= [ ],
		win			= window,
		doc			= win.document,
		undef;

	// Object.type() - Non-standard. Returns the [[Class]] property from an object. Returns 'Node' for all HTMLxxxElement collections
	Object.type = function _type( obj ) {
		var res = toStr.call( obj ).split( ' ' )[ 1 ].replace( ']', '' );
		
		if( obj === win ) {
			res = 'Window';
		}
		else if( res === 'Window' || res === 'Global' ) {
			res = 'Undefined';
		}
		else if( res.indexOf( 'HTML' ) === 0 ) { 
			res = 'Node';
		}
		
		return ( win.setLastError( res ) );
	};
	
	// Object.hasKeys() - Non-standard. Returns true if all keys are available in an object
	Object.hasKeys = function _hasKeys( obj, keys ) {
		if( typeof keys === 'string' ) {
			keys = keys.split( /\s/ );
		}
		
		if( Object.type( obj ) === 'Object' ) {
			if( Object.type( keys ) === 'Array' ) {
				return keys.every( checkProp );
			}
		}
		
		return false;
		
		function checkProp( prop ) {
			return prop in obj;
		}
	};
	
	// Object.map - Non-standard. Takes an object and a transform method (which gets passed in key/values). The Method must return an Array with new key/value pair
	Object.map = function _map( obj, transform ) {
		if( Object.type( obj ) === 'Object' && Object.type( transform ) === 'Function' ) {
			Object.keys( obj ).forEach(function _forEach( key ) {
				(function _mapping( oldkey, transmuted ) {
					if( transmuted && transmuted.length ) {
						obj[ transmuted[ 0 ] || oldkey ] = transmuted[ 1 ];
						
						if( transmuted[ 0 ] && oldkey !== transmuted[ 0 ] ) { 
							delete obj[ oldkey ];
						}
					}
				}( key, transform.apply( obj, [ key, obj[ key ]] ) ));
			});
		}
	};
	
	// simplified sprintf() - Non-standard
	String.prototype.sFormat = function _simpleFormat( map ) {
		var myString	= this.toString(),
			args		= Object.type( map ) === 'Array' ? map : slice.call( arguments ),
			next		= 0;
	
		while( ~myString.indexOf( '%r' ) ) {
			myString = myString.replace( '%r', args[ next++ ] );
		}
		
		return myString;
	};
	
	// window.requestAnimationFrame()
	win.requestAnimFrame = (function() {
		return	win.requestAnimationFrame       || 
				win.webkitRequestAnimationFrame || 
				win.mozRequestAnimationFrame    || 
				win.oRequestAnimationFrame      || 
				win.msRequestAnimationFrame     || 
				function _animationInterval( callback ) {
					win.setTimeout( function() {
						if( 'hasFocus' in doc ) {
							if( doc.hasFocus() ) {
								callback();
							}
							else {
								_animationInterval( callback );
							}
						}
						else {
							callback();
						}
					}, 1000 / 60 );
				};
	}());
	
	win.getLastError = function( offset ) {
		if( typeof offset === 'number' ) {
			return lastError.slice( offset )[ 0 ];
		}
		else {
			return lastError.slice( -1 )[ 0 ];
		}
	};
	
	win.setLastError = function( err ) {
		if( err !== undef ) {
			if( lastError.length >= 10 ) {
				lastError.shift();
			}
			lastError.push( err );
			
			return err;
		}
	};
		
	win.By = {
		id: function byId(id) {
			return doc.getElementById( id );
		},
		tag: function byTagName( tag, context ) {
			return (context || doc).getElementsByTagName( tag );
		},
		className: function byClass( className, context ) {
			return (context || doc).getElementsByClassName( className );
		},
		name: function byName( name ) {
			return doc.getElementsByName( name );
		},
		qsa: function byQuery(query, context) {
			return (context || doc).querySelectorAll( query );
		},
		qs: function byQueryOne(query, context) {
			return (context || doc).querySelector( query );
		}
	};
	
	// create a console object if not availabe and fill it with noop-methods, which the "real" console objects can offer
	// this will avoid errors, if there is an access to a console-method on browsers which doesn't supplys a debugger
	if(!( 'console' in win ) ) {
		win.console = { };
		
		'debug info warn exception assert dir dirxml trace group groupEnd time timeEnd profile profileEnd table log error'.split( /\s/ ).forEach(function( prop ) {
			win.console[ prop ] = function() { };
		});
	}
});