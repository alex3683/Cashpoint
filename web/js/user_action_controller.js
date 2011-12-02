define( function() {

   var _server = null;

   function setupUIElements() {
      
      $( '#addVoucherButton' ).button( {
         icons: {
            primary: 'ui-icon-cart'
         }
      } );
      
      $( '#addUserDialog' ).dialog( {
         autoOpen: false,
         width: 350,
         height: 150,
         modal: true,
         buttons: {
            'Hinzufügen': function() {
               var dialog = this;
               $( '#addUserDialog input' ).removeClass( 'ui-state-error' );
               if( $( '#addUserName' ).val().length < 1 ) {
                  $( '#addUserName' ).addClass( 'ui-state-error' );
                  alert( "Bitte geben Sie einen Namen ein" );
                  return;
               }

               addUserWithName( $( '#addUserName' ).val(), function( err ) {
                  if( err ) {
                     alert( err );
                  }
                  else {
                     $( '#addUserDialog' ).dialog( 'close' );
                  }
               } );

            },
            'Abbrechen': function() {
               $( this ).dialog( 'close' );
            }
         },
         close: function() {
            $( '#addUserDialog input' ).val( '' ).removeClass( 'ui-state-error' );
         }
      } );

      $( '#addUserButton' ).click( function() {
         $( '#addUserDialog' ).dialog( 'open' );
      } );
   }

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

   return {
      setServerApi: function( server ) {
         _server = server;
      },
      setupUIElements: setupUIElements
   };

} );