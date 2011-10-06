define( function() {
   
   var server = null;
   
   $( '#addVoucherButton' ).button( {
      icons: {
         primary: "ui-icon-cart"
      }
   } );
   
   $( '#addUserButton' ).button( {
      icons: {
         primary: "ui-icon-person"
      }
   } );
   
   $( '#addVoucherDialog' ).dialog( {
      autoOpen: false,
      width: 350,
      height: 150,
      modal: true,
      buttons: {
         'Hinzufügen': function() {

            $( this ).dialog( 'close' );
         },
         'Abbrechen': function() {
            $( this ).dialog( 'close' );
         }
      },
      close: function() {
         // remove error state
         //allFields.val( '' ).removeClass( 'ui-state-error' );
      }
   } );

   $( '#addVoucherButton' ).click( function() {
      $( '#addVoucherDialog' ).dialog( 'open' );
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
            if( $( '#addUserName' ).val().length < 4 ) {
               $( '#addUserName' ).addClass( 'ui-state-error' );
               return;
            }

            server.addUserWithName( $( '#addUserName' ).val(), function( err ) {
               if( err ) {
                  switch( err.message ) {
                     case 'notConnected':
                        alert( 'Fehler: Datenbankverbindung nicht verfügbar' );
                        break;
                        
                     default:
                        alert( err.message );
                  }
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
   
   return {
      setServerApi: function( api ) {
         server = api;
      }
   };
   
} );