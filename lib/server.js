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
      
      var stats = fs.statSync( resourcePath );
      if( stats.isFile() ) {
         serveSimpleFileResource( request, response, resourcePath );
         return;
      }
      else if( stats.isDirectory() ) {
         var indexFile = path.join( resourcePath, 'index.html' );
         if( path.existsSync( indexFile ) ) {
            serveSimpleFileResource( request, response, indexFile );
            return;
         }
      }
       
      flushResponseWithStatusCode( response, 403 );
      
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
   
   if( request.headers[ 'accept-encoding' ].indexOf( 'gzip' ) !== -1 ) {
      var compress = require( 'compress' );

      // Create gzip stream
      var gzip = new compress.Gzip();
      gzip.init();

      // Pump data to be compressed
      var gzdata1 = gzip.deflate( fs.readFileSync( resourcePath ), 'binary' ) + gzip.end(); 
      response.setHeader( 'Content-Encoding', 'gzip' );
      response.end( gzdata1 );
   }
   else {
      response.end( fs.readFileSync( resourcePath ) );
   }
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
