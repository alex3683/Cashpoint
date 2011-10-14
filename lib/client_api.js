var nowjs = require( 'now' );

exports.initialize = function( httpServer, storage ) {
   var everyone = nowjs.initialize( httpServer );

   everyone.now.log = function( msg ) {
      console.log( msg );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   everyone.now.getUsers = function( callback ) {
      storage.getUsers( callback );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   everyone.now.addUser = function( user, callback ) {
      storage.addUser( user, callback );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   everyone.now.addVoucherForUser = function( voucher, user, callback ) {
      storage.addVoucherForUser( voucher, user, callback );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   everyone.now.getVouchers = function( callback ) {
      storage.getVouchers( callback );
   };
   
};
