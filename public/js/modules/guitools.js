define([ 'es5shim', 'tools' ], function( es5shim, tools ) {
	"use strict";

	var Public	= Object.create( null ),
		win		= tools.win,
		doc		= tools.doc,
		type	= tools.type,
		slice	= tools.slice,
		nodeHash, availableNames, undef;
	
	tools.mix( Public ).with({
		$:				createNodeInstance,
		cacheNodes:		cacheNodes,
		By:				{
			'id':		function byId( id ) {
				return slice.call([ doc.getElementById( id ) ]);
			},
			'tag':		function byTagName( tag, ctx ) {
				return slice.call( this.makeCtx( ctx ).getElementsByTagName( tag ) );
			},
			'class':	function byClass( className, ctx ) {
				return slice.call( this.makeCtx( ctx ).getElementsByClassName( className ) );
			},
			'name':		function byName( name ) {
				return slice.call( doc.getElementsByName( name ) );
			},
			'qsa':		function byQuery( query, ctx ) {
				return slice.call( this.makeCtx( ctx ).querySelectorAll( query ) );
			},
			'qs':		function byQueryOne( query, ctx ) {
				return slice.call([ this.makeCtx( ctx ).querySelector( query ) ]);
			},
			'makeCtx':	function makeContext( ctx ) {
				if( typeof ctx === 'string' ) {
					switch( ctx.charAt( 0 ) ) {
						case '#':	return this.id( ctx.slice( 1 ) )[ 0 ];
						case '.':	return this.class( ctx.slice( 1 ) )[ 0 ];
						default:	return this.qs( ctx )[ 0 ];
					}
				} else if( type( ctx ) === 'Node' ) {
					return ctx;
				} else if( ctx === undef ) {
					return doc;
				} else {
					throw new TypeError( 'By() requires a node reference or a query string as context argument' );
				} 
			}
		}
	});
	
	return Public;
	
	// -- local helpers --
	function createNodeInstance( nodesArray ) {
	}
	
	function crawlNodes( node ) {
		var currentTag = null,
			i, len;
	
		if( type( node ) === 'Node' ) {
			currentTag = node.nodeName.toLowerCase() + ( node.id ? ('#' + node.id) : node.className ? ('.' + node.className.split( /\s+/ )[ 0 ]) : '' );
			
			// avoid duplicates, keep track on the number of identical identifiers
			if( typeof availableNames[ currentTag ] === 'undefined' ) {
				availableNames[ currentTag ] = 1;
			}
			else {
				availableNames[ currentTag ]++;
			}
		
			// fill nodeHash lookup
			if( typeof nodeHash[ currentTag ] === 'undefined' ) {
				nodeHash[ currentTag ] = node;
			}
			else {
				nodeHash[ currentTag + '(' + availableNames[ currentTag ] + ')' ] = node;
			}
			
			// loop over every childnode, if we have children of children, recursively recall crawlNodes()
			if( node.children.length ) {
				for( i = 0, len = node.children.length; i < len; i++ ) {
					crawlNodes( node.children[ i ] );
				}
			}
		}
	}
	
	function cacheNodes( rootNode ) {
		nodeHash		= Object.create( null );
		availableNames	= Object.create( null );
	
		crawlNodes( rootNode );
		
		return nodeHash;
	}
});