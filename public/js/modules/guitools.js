define(function( require, exports, module ) {
	"use strict";

	var nodeHash, availableNames;

	return {
		cacheNodes: cacheNodes
	};
	
	// -- local helpers --
	function crawlNodes( node ) {
		var currentTag = null,
			i, len;
	
		if( Object.type( node ) === 'Node' ) {
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