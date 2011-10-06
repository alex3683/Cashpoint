var path = require( 'path' );
var connect = require( 'connect' );
var gzip = require( 'connect-gzip' );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.startServer = function( port ) {
   var webRoot = path.normalize( './web' );
   var httpServer = connect( gzip.staticGzip( webRoot ), connect.staticCache() );
   
   httpServer.listen( port );
   
   return httpServer;
};