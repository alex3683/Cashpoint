var nowjs = require( 'now' );
var _ = require( 'underscore' );
var dataMapper = require( './data_mapper' );

exports.initialize = function( httpServer, storage, debtCalculator ) {
   var everyone = nowjs.initialize( httpServer );
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.log = function( msg ) {
      console.log( "Logged: " + msg );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.addUser = function( user, callback ) {
      storage.addUser( user, eventEmittingCallback( callback, 'userAdded' ) );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.addVoucher = function( voucher, callback ) {
      voucher.repaid = false;
      voucher = dataMapper.voucherForDataBase( voucher );
      storage.addVoucher( voucher, flattenVoucherCallback( eventEmittingCallback( callback, 'voucherAdded' ) ) );
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
   
   everyone.now.getUserStatistics = function( callback ) {
      storage.getNonRepaidVouchers( function( err, vouchers ) {
         var result = {};
         _.each( vouchers, function( voucher ) {
            var userName = voucher.users[0].name;
            if( !result[ userName ] ) {
               result[ userName ] = {
                  vouchers: 0,
                  amount: 0
               };
            }
            result[ userName ].vouchers++;
            result[ userName ].amount += voucher.amount;
         } );
         callback( null, result );
      } );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   everyone.now.calculateDebts = function( vouchers, callback ) {
      debtCalculator.calculateDebts( vouchers, callback );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function flattenVoucherCallback( callback ) {
      return function( err, voucher ) {
         if( err ) {
            return callback( err );
         }
         callback( null, dataMapper.voucherFromDataBase( voucher ) );
      };
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function flattenVouchersCallback( callback ) {
      return function( err, vouchers ) {
         if( err ) {
            return callback( err );
         }
         var flattened = _.map( vouchers, dataMapper.voucherFromDataBase );
         callback( null, flattened );
      };
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function eventEmittingCallback( callback, eventType ) {
      return function( err, data ) {
         callback( err, data );
         if( !err ) {
            everyone.now.handleEvent( {
               'type': eventType,
               'data': data
            } );
         }
      };
   }
   ;

};
