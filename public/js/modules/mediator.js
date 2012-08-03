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

	Public.emit = function _dispatch( messageInfo ) {
		win.setTimeout(function _setTimeoutDispatch() {
			var listenerCount = 0;
			
			if( type( messageInfo ) === 'Object' ) {
				if( typeof messageInfo.name === 'string' ) {
			//console.groupCollapsed('MEDIATOR: Dispatching event ', messageInfo.name);
					if( messageInfo.name in messagePool ) {
						messagePool[ messageInfo.name ].some(function _some( listener, idx ) {
							try {
						//	console.info( 'eventData for listener #' + idx );
						//	console.dir( messageInfo );
								listener.callback.apply( listener.scope, [ messageInfo ] );
								listenerCount++;
							} catch( ex ) {
								throw new Error( 'unable to dispatch event "' + messageInfo.name + '". Original error: "' + ex.message + '"' );
							}
						
							return messageInfo.stopPropagation;
						});
					}
					
					if( typeof messageInfo.callback === 'function' ) {
						messageInfo.callback( listenerCount, messageInfo.response );
					}
			//console.groupEnd();
				}
				else {
					throw new Error( 'expected an event type as string' );
				}
			}
			else {
				throw new Error( 'expected an object' );
			}
		}, 0);
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