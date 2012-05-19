var fs = require( 'fs' );
var storage = require( './lib/storage' );
var server = require( './lib/server' );
var debtCalculator = require( './lib/debt_calculator' );
var clientApi = require( './lib/client_api' );

var config = require( './config.json' );

console.log( config );

storage.initialize( config.dataBaseURL );
debtCalculator.initialize( storage );
clientApi.initialize( server.start( config.httpPort ), storage, debtCalculator );