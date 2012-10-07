define([ 'es5shim' ], function( es5shim ) {
	"use strict";
	
	var Public		= Object.create( null ),
		toStr		= Object.prototype.toString,
		desc		= Object.getOwnPropertyDescriptor,
		defineProp	= Object.defineProperty,
		props		= Object.getOwnPropertyNames,
		slice		= Array.prototype.slice,
		forEach		= Array.prototype.forEach,
		
		lastError	= [ ],
		win			= window,
		doc			= win.document,
		undef;
	
	mix( Public ).with({
		mix:					mix,
		type:					type,
		hasKeys:				hasKeys,
		map:					map,
		slice:					slice,
		forEach:				forEach,
		props:					props,
		defineProp:				defineProp,
		desc:					desc,
		win:					win,
		doc:					doc,
		requestAnimationFrame:	(function() {
			return	win.requestAnimationFrame       || 
					win.webkitRequestAnimationFrame || 
					win.mozRequestAnimationFrame    || 
					win.oRequestAnimationFrame      || 
					win.msRequestAnimationFrame     || 
					animationInterval;
					
			function animationInterval( callback ) {
				win.setTimeout( animator, 1000 / 60 );
				
				function animator() {
					if( 'hasFocus' in doc ) {
						if( doc.hasFocus() ) {
							callback();
						} else {
							_animationInterval( callback );
						}
					} else {
						callback();
					}
				}
			}
		}())
	});

	/* -- locals */
	
	// mixin() - extends an object with a source
	function mix( target ) {
		return {
			'with': function _with( source ) {
				props( source ).forEach( loopKeys );
			
				return target;
				
				// -- local helpers --
				function loopKeys( key ) {
					defineProp( target, key, desc( source, key ) );
				}
			}
		};
	};
	
	// .type() - Non-standard. Returns the [[Class]] property from an object. Returns 'Node' for all HTMLxxxElement collections
	function type( obj ) {
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
	
	// .hasKeys() - Non-standard. Returns true if all keys are available in an object
	function hasKeys( obj, keys ) {
		if( typeof keys === 'string' ) {
			keys = keys.split( /\s/ );
		}
		
		if( Public.type( obj ) === 'Object' ) {
			if( Object.type( keys ) === 'Array' ) {
				return keys.every( checkProp );
			}
		}
		
		return false;
		
		function checkProp( prop ) {
			return prop in obj;
		}
	};
	
	// .map - Non-standard. Takes an object and a transform method (which gets passed in key/values). The Method must return an Array with new key/value pair
	function map( obj, transform ) {
		if( Public.type( obj ) === 'Object' && Public.type( transform ) === 'Function' ) {
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
			args		= Public.type( map ) === 'Array' ? map : slice.call( arguments );
	
		while( ~myString.indexOf( '%r' ) ) {
			myString = myString.replace( '%r', args.shift() );
		}
		
		return myString;
	};
	
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
	
	// create a console object if not availabe and fill it with noop-methods, which the "real" console objects can offer
	// this will avoid errors, if there is an access to a console-method on browsers which doesn't supplys a debugger
	if(!( 'console' in win ) ) {
		win.console = { };
		
		'debug info warn exception assert dir dirxml trace group groupEnd time timeEnd profile profileEnd table log error'.split( /\s/ ).forEach(function( prop ) {
			win.console[ prop ] = function() { };
		});
	}
	
	return Public;
});