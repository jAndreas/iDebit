define([ 'es5shim', 'tools' ], function( es5shim, tools ) {
	"use strict";

	var Public	= Object.create( null ),
		win		= window,
		doc		= win.document,
		type	= tools.type,
		nodeHash, availableNames;
	
	tools.mixin( Public ).with({
		cacheNodes:		cacheNodes,
		By:				{
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
		}
	});
	
	return Public;
	
	// -- local helpers --
	function crawlNodes( node ) {
		var currentTag = null,
			i, len;
	
		if( type( node ) === 'Node' ) {
			currentTag = node.id ? node.nodeName + '#' + node.id : null || node.className ? node.nodeName + "." + node.className.split( /\s+/ )[ 0 ] : null || node.nodeName;
			
			// avoid duplicates, keep track on the number of identical identifiers
			if( typeof availableNames[ currentTag ] === 'undefined' ) { availableNames[ currentTag ] = 1;
			}
			else {
				availableNames[ currentTag ]++;
			}
		
			// fill nodeHash lookup
			if( typeof nodeHash[ currentTag ] === 'undefined' ) {
				nodeHash[ currentTag ] = node;
			}
			else {
				nodeHash[ currentTag + availableNames[ currentTag ] ] = node;
			}
			
			// loop over every childnode, if we have children of children, recursively recall cacheNodes()
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