var fs = require( 'fs' );
var storage = require( './lib/storage' );
var server = require( './lib/server' );
var debtCalculator = require( './lib/debt_calculator' );
var clientApi = require( './lib/client_api' );

var config = JSON.parse( fs.readFileSync( __dirname + '/config.json', 'utf-8' ) );

console.log( config );

storage.initialize( config.dataBaseURL );
debtCalculator.initialize( storage );
clientApi.initialize( server.start( config.httpPort ), storage, debtCalculator );