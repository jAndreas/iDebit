
/**
 * Module dependencies.
 */

var express		= require( 'express' ),
	http		= require( 'http' ),
	connect		= require( 'connect' ),
	routes		= require( './routes' );

var app			= module.exports = express.createServer(),
	//server		= http.createServer( app ),
	io			= require( 'socket.io' ).listen( app );

// Configuration

app.configure(function() {
	app.set( 'views', '/home/jandy/my/git/idebit/views' ); // __dirname
	app.set( 'view engine', 'jade' );
	app.use( express.bodyParser() );
	app.use( express.methodOverride() );
	app.use( app.router );
	app.use( connect.compress() );
	app.use( express.static( '/home/jandy/my/git/idebit/public' ) );
});

//app.configure('development', function(){
	//app.use( express.errorHandler( {dumpExceptions: true, showStack: true} ) );
//});

app.configure('production', function(){
	app.use( express.errorHandler() );
});

// Routes

app.get( '/', routes.index );

app.listen(8003, function(){
	console.log("Express server listening on port %d in %s mode", 8003, app.settings.env);
});

var users = {
		robert:	{
			password:	'robert'
		},
		andi: {
			password:	'andi'
		},
		marcel: {
			password:	'marcel'
		},
		jens: {
			password:	'jens'
		},
		matthias: {
			password:	'matthias'
		},
		matze: {
			password:	'matze'
		}
	};


// WebSockets

io.sockets.on('connection', function( socket ) {
	socket.emit( 'ACK', 'welcome' );

	socket.on( 'message', onMessage );
	socket.on( 'close', onClose );
	socket.on( 'disconnect', onClose );
	socket.on( 'login', onLogin );
	socket.on( 'getmoney', onGetMoney );
	
	console.log('==> connection from: ', socket.handshake.address );
	console.log('==> socked ID: ', socket.id );
	
	// locals
	function onMessage( data ) {
	}
	
	function onClose( data ) {
		console.log('==> END CLOSE: ', socket.id );
		console.log('==> data: ', arguments);
		Object.keys( users ).forEach( removeSession );
		
		function removeSession( user ) {
			if( user.socket && user.socket.id === socket.id ) {
				user.session = null;
			}
		}
	}
	
	function onGetMoney( data, fn ) {
		var from = users[ data.from ];
		
		if( from && from.session ) {
			from.socket.emit( 'moneyrequested', {
				sender:		data.sender,
				amount:		data.amount
			});
		}
		else if( from && !from.session ) { // user seems offline
			
		}
	}
	
	function onLogin( data, fn ) {
		var usr;
	
		if( usr = users[ data.name ] ) {
			if( usr.password === data.password ) {
				usr.session = Math.abs( ~~(Math.random() * Date.now()) );
				usr.socket = socket;
				
				fn({
					status:		'success',
					session:	usr.session,
					name:		data.name,
					people:		Object.keys( users ).filter( ownName )
				});
			}
			else {
				fn({
					status:		'fail',
					reason:		'wrong password or username'
				});
			}
		}
		else {
			fn({
				status:		'fail',
				reason:		'wrong password or username'
			});
		}
		
		// locals
		function ownName( name ) {
			return name !== data.name;
		}
	}
});