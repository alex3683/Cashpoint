var nowjs = require( 'now' );
var _ = require( 'underscore' );

exports.initialize = function( httpServer, storage, debtCalculator ) {
   var everyone = nowjs.initialize( httpServer );
   
   var voucherClientFields = [ 'amount', 'paid_date', 'comment', 'repaid', 'repaid_date' ];
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.log = function( msg ) {
      console.log( "Logged: " + msg );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.addUser = function( user, callback ) {
      storage.addUser( user, callback );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.addVoucherForUser = function( voucher, user, callback ) {
      voucher.repaid = false;
      storage.addVoucherForUser( voucher, user, callback );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.getVouchers = function( callback ) {
      storage.getVouchers( flattenVouchersCallback( callback ) );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.getNonRepaidVouchers = function( callback ) {
      storage.getNonRepaidVouchers( flattenVouchersCallback( callback ) );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.getUsers = function( callback ) {
      storage.getUsers( callback );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.calculateDebts = function( callback ) {
      debtCalculator.calculateDebts( callback );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   storage.setEventRouter( function( event ) {
      everyone.now.handleEvent( event );
   } );
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function flattenVouchersCallback( callback ) {
      return function( err, vouchers ) {
         if( err ) {
            return callback( err );
         }
         var flattened = _.map( vouchers, function( voucher ) {
            var copy = _.pick( voucher, voucherClientFields );
            copy.user = voucher.users[ 0 ];
            delete copy.users;
            return copy;
         } );
         callback( null, flattened );
      };
   }

};
