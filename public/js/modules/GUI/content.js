define(function( require, exports, module ) {
	"use strict";
	
	var guiTools	= require( 'guitools' ),
		deferred	= require( 'deferred' ),
		mediator	= require( 'mediator' ),
		server		= require( 'server' );
		
	var Public			= Object.create( null ),
		nodes			= guiTools.cacheNodes( By.className( 'content' )[ 0 ] );
		
	var ownName = 'villain';
		
	nodes['BUTTON.login'].addEventListener( 'click', onLoginClick, false );
	nodes['DIV.app'].addEventListener( 'click', onGetClick, false );
	
	server.on( 'moneyrequested', onMoneyRequested );
	
	// locals
	function onMoneyRequested( data ) {
		if( confirm( data.sender + ' will ' + data.amount + ' flocken von Dir haben..' ) ) {
			server.emit( 'requestconfirmed', {
				
			});
		}
	}
	
	function onLoginResponse( data ) {
		if( data ) {
			switch( data.status ) {
				case 'success':
					ownName = data.name;
					
					if( Object.type( data.people ) === 'Array' ) {
						data.people.forEach( addNewLine );
					}

					nodes['DIV.login'].className = nodes['DIV.login'].className + ' hidden';
					nodes['DIV.app'].className = nodes['DIV.app'].className + ' visible';
					break;
				case 'fail':
					alert('login failed');
					break;
			}
		}
		
		// locals
		function addNewLine( name ) {
			var tmpl	= '<span class="name">%r</span><span class="status">%r</span><button data-target="%r" class="getmoney">Schulden eintreiben</button>'.sFormat( name, '0', name ),
				div 	= document.createElement( 'div' );
			
			div.className = 'infoLine';
			div.innerHTML = tmpl;
			
			nodes['DIV.app'].appendChild( div );
		}
	}
	
	function onLoginClick( event ) {
		server.emit( 'login', {
			name:		nodes['INPUT.username'].value,
			password:	nodes['INPUT.password'].value
		}, onLoginResponse );
	}
	
	function onGetClick( event ) {
		if( event.target.nodeName === 'BUTTON' ) {
			var value = prompt('Wieviel soll\'s denn sein ?', 0);
			
			server.emit( 'getmoney', {
				from:		event.target.getAttribute( 'data-target' ),
				sender:		ownName,
				amount:		value
			}, onGetMoneyResponse );
		}
		
		// locals
		function onGetMoneyResponse( data ) {
		}
	}
});