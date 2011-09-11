var http = require( 'http' );
var path = require( 'path' );
var fs = require( 'fs' );
var url = require( 'url' );
var mime = require( 'mime' );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.startServer = function( port ) {
   var webRoot = path.normalize( './web' );
   var httpServer = http.createServer( function( request, response ) {
      var urlParts = url.parse( request.url );
      var resource = urlParts.pathname;
      var resourcePath = path.join( webRoot, resource );

      if( !resourcePath.indexOf( webRoot ) === 0 ) {
         flushResponseWithStatusCode( response, 403 );
         return;
      }

      if( !path.existsSync( resourcePath ) ) {
         flushResponseWithStatusCode( response, 404 );
         return;
      }
      
      serveSimpleFileResource( request, response, resourcePath );
   } );

   httpServer.listen( port );

   return httpServer;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function serveSimpleFileResource( request, response, resourcePath ) {
   var etag = calculateETag( resourcePath );
   if( etag === request.headers[ 'if-none-match' ] ) {
      flushResponseWithStatusCode( response, 304 );
      return;
   }
   
   response.setHeader( 'ETag', etag );
   response.setHeader( 'Content-Type', mime.lookup( resourcePath ) );
   response.end( fs.readFileSync( resourcePath ) );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calculateETag( resourcePath ) {
   var stats = fs.statSync( resourcePath );
   return '"' + stats.ino + '-' + stats.size + '-' + Date.parse( stats.mtime ) + '"';
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function flushResponseWithStatusCode( response, statusCode ) {
   response.statusCode = statusCode;
   response.end();
}
