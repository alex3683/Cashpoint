var nowjs = require( 'now' );

exports.initialize = function( httpServer, storage ) {
   var everyone = nowjs.initialize( httpServer );

   everyone.now.logStuff = function( msg ) {
      console.log( msg );
   };
   
   everyone.now.getUsers = function( callback ) {
      storage.getUsers( callback );
   };
   
   everyone.now.addUserWithName = function( name, callback ) {
      storage.addUserWithName( name, callback );
   };
   
   everyone.now.getVouchers = function( callback ) {
      storage.getVouchers( callback );
   };
   
};
