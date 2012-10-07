/* 
 * mediator.js
 * ------------------------------
 * Intermodule communication (mediator)
 * 
 * Message object structure:
 * {
 * 		name: <name of event>,
 * 		data: <any data>
 * }
 * 
 * This code runs in strict mode (if supported by the environment).
 * ------------------------------
 * Author: Andreas Goebel
 * Date: 2011-06-18
 * Changed: 2012-06-20 - moved code into a commonJS module
 */

define([ 'es5shim', 'tools' ], function( es5shim, tools ) {
	"use strict";
	
	var messagePool	= Object.create( null ),
		Public		= Object.create( null ),
		type		= tools.type,
		win			= window,
		doc			= win.document,
		undef;

	Public.emit = function _dispatch( eventName, eventData, callback ) {
		win.setTimeout(function _setTimeoutDispatch() {
			var listenerCount = 0;
			
			if( type( eventName ) === 'String' ) {
			//console.groupCollapsed('MEDIATOR: Dispatching event ', messageInfo.name);
				if( eventName in messagePool ) {
					messagePool[ eventName ].some(function _some( listener, idx ) {
						try {
					//	console.info( 'eventData for listener #' + idx );
					//	console.dir( messageInfo );
							listener.callback.call( listener.scope, eventData );
							listenerCount++;
						} catch( ex ) {
							throw new Error( 'unable to dispatch event "' + eventName + '". Original error: "' + ex.message + '"' );
						}
					
						return eventData.stopPropagation;
					});
				}
				
				if( typeof callback === 'function' ) {
					callback( listenerCount, eventData.response );
				}
			//console.groupEnd();
			}
			else {
				throw new Error( 'mediator: emit() expects eventName as string(required) / eventData(optional) / callback as function(optional).' );
			}
		}, 13);
	};

	Public.on = function _listen( eventName, callback, scope ) {
		if( type( eventName ) !== 'Array' ) {
			eventName = [ eventName ];
		}
	//console.info('MEDIATOR: Listening for ', eventName, 'method: ', callback);	
		eventName.forEach(function _forEach( event ) {
			if( typeof event === 'string' ) {
				if( typeof messagePool[ event ] === 'undefined' ) {
					messagePool[ event ] = [ ];
				}
					
				if( typeof callback === 'function' ) {
					messagePool[ event ].push( { callback: callback, scope: scope || null } );
				}
			} else {
				throw new Error( 'expected a string value (or an Array of strings), received "' + typeof event + '" instead' );
			}
		});
	};
	
	Public.off = function _forget( eventName, callback ) {
		if( type( eventName ) !== 'Array' ) {
			eventName = [ eventName ];
		}
	//console.info('MEDIATOR: Forgetting for ', eventName, 'method: ', callback);
		eventName.forEach(function( event ) {
			if( typeof event === 'string' ) {
				if( messagePool[ event ] && type( messagePool[ event ] ) === 'Array' ) {
					if( callback === undef ) {
						messagePool[ event ] = [ ];
					}
					else {
						messagePool[ event ] = messagePool[ event ].filter(function( eventObj ) {
							return eventObj.callback !== callback;
						});
					}
				}
			}
			else {
				throw new Error( 'expected a string value (or an Array of strings)' );
			}
		});
	};
	
	Public.once = function _listenOnce( eventName, callback, scope ) {
		function fireAndForget() {
			Public.off( eventName, fireAndForget );
			callback.apply( this, arguments );
		}
		
		Public.on( eventName, fireAndForget, scope );
	};
	
	return Public;
});