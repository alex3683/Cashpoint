define( function() {
   
   var _server = null;
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function addVoucherForUser( user, comment, amount, paid_date, callback ) {
      var voucher = {
         'comment': comment,
         'amount': amount,
         'paid_date': paid_date
      };
      _server.addVoucherForUser( voucher, user, function( err ) {
         if( err ) {
            var interpretedMessage = err;
            switch( err ) {
               case 'notConnected':
                  interpretedMessage = 'Fehler: Datenbankverbindung nicht verfügbar';
                  break;
            }
            
            return callback( interpretedMessage );
         }
         
         callback();
      } );
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   return {
      setServerApi: function( server ) {
         _server = server;
      },
      addVoucherForUser: addVoucherForUser
   };
   
} );