var async = require( 'async' );
var _storage = null;

exports.initialize = function( storage ) {
   _storage = storage;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.calculateDebts = function( callback ) {
   async.series( [ function( callback ) {
      _storage.getNonRepaidVouchers( callback );
   } ], function( err, vouchers ) {
      var result = 0;
      //console.log( "amount:" + JSON.stringify( vouchers ) );
      vouchers[0].forEach( function( voucher ) {
         result += voucher.amount;
      } );
      callback( null, result );
   } );
};