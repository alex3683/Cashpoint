var fs = require( 'fs' );
var storage = require( './lib/storage.js' );
var server = require( './lib/server.js' );
var clientApi = require( './lib/client_api' );

var config = JSON.parse( fs.readFileSync( __dirname + '/config.json', 'utf-8' ) );

console.log( config );

storage.initialize();
clientApi.initialize( server.start( config.httpPort ), storage );