exports.start = function( port ) {
   var path = require( 'path' );
   var connect = require( 'connect' );
   var http = require( 'http' );
   var connectGzip = require( 'connect-gzip' );
   
   var webRoot = path.normalize( './web' );
   var connectApp = connect();
   connectApp.use( connectGzip.staticGzip( webRoot ), connect.staticCache() );
   
   var httpServer = http.createServer( connectApp ).listen( port );
   
   return httpServer;
};