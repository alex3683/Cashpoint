var fs = require( 'fs' );
var storage = require( './lib/storage.js' );

var config = JSON.parse( fs.readFileSync( __dirname + '/config.json', "utf-8" ) );

console.log( config );

var httpServer = require( './lib/server.js' ).startServer( config.httpPort );

storage.initialize();
require( './lib/client_api' ).initialize( httpServer, storage );