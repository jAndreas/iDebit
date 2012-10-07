define([ 'guitools', 'deferred', 'mediator', 'server', 'tools' ], function( guiTools, deferred, mediator, server, tools ) {
	"use strict";
		
	var Public			= Object.create( null ),
		By				= guiTools.By,
		type			= tools.type,
		nodes;
		
	var ownName = 'villain';
	
	tools.mix( Public ).with({
		init:		init,
		destroy:	destroy
	});
	
	server.on( 'moneyrequested', onMoneyRequested );
	
	return Public;
	
	// -- local helpers --
	function init() {
		console.log( 'content.js init' );
		
		nodes = guiTools.cacheNodes( By.class( 'content' )[ 0 ] );
		
		nodes['button.login'].addEventListener( 'click', onLoginClick, false );
		nodes['div.app'].addEventListener( 'click', onGetClick, false );
	}
	
	function destroy() {
	}
	
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
					
					if( type( data.people ) === 'Array' ) {
						data.people.forEach( addNewLine );
					}

					nodes['div.login'].className = nodes['div.login'].className + ' hidden';
					nodes['div.app'].className = nodes['div.app'].className + ' visible';
					break;
				case 'fail':
					alert('login failed');
					break;
			}
		}
		
		// -- local helpers --
		function addNewLine( name ) {
			var tmpl	= '<span class="name">%r</span><span class="status">%r</span><button data-target="%r" class="getmoney">Schulden eintreiben</button>'.sFormat( name, '0', name ),
				div 	= document.createElement( 'div' );
			
			div.className = 'infoLine';
			div.innerHTML = tmpl;
			
			nodes['div.app'].appendChild( div );
		}
	}
	
	function onLoginClick( event ) {
		server.emit( 'login', {
			name:		nodes['input.username'].value,
			password:	nodes['input.password'].value
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
		
		// -- local helpers --
		function onGetMoneyResponse( data ) {
		}
	}
});