exports.start = function( port ) {
   var path = require( 'path' );
   var connect = require( 'connect' );
   var connectGzip = require( 'connect-gzip' );
   
   var webRoot = path.normalize( './web' );
   var httpServer = connect( connectGzip.staticGzip( webRoot ), connect.staticCache() );
   
   httpServer.listen( port );
   
   return httpServer;
};