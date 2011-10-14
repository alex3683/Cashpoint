define( function() {
   
   var _server = null;
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function addUserWithName( name, callback ) {
      _server.addUser( {
         'name': name
      }, function( err ) {
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
   
   function getUsers( callback ) {
      _server.getUsers( callback );
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   return {
      setServerApi: function( server ) {
         _server = server;
      },
      addUserWithName: addUserWithName,
      getUsers: getUsers
   };
   
} );