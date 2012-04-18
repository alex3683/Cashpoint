var async = require( 'async' );
var _storage = null;

exports.initialize = function( storage ) {
   _storage = storage;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.calculateDebts = function( vouchers, callback ) {
   var result = 0;
   vouchers.forEach( function( voucher ) {
      result += voucher.amount;
   } );
   process.nextTick(function() {
      callback( null, result );
   });
};