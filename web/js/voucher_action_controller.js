define( function() {

   var _server = null;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function setupUIElements() {
      $( '#addUserButton' ).button( {
         icons: {
            primary: 'ui-icon-person'
         }
      } );

      $( '#addVoucherPaidDate' ).datepicker( {
         dateFormat: 'dd.mm.yy',
         defaultDate: new Date(),
         maxDate: new Date(),
         firstDay: 1,
         dayNames: [ 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag' ],
         dayNamesMin: [ 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' ],
         monthNames: [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September',
               'Oktober', 'November', 'Dezember' ],
         nextText: 'Nächster Monat',
         prevText: 'Vorheriger Monat'
      } );

      $( '#addVoucherDialog' ).dialog( {
         autoOpen: false,
         width: 350,
         height: 200,
         modal: true,
         buttons: {
            'Hinzufügen': function() {
               var dialog = this;
               $( '#addVoucherDialog input' ).removeClass( 'ui-state-error' );
               var amount = parseFloat( $( '#addVoucherAmount' ).val().replace( ',', '.' ), 10 );
               if( isNaN( amount ) || amount <= 0 ) {
                  $( '#addVoucherAmount' ).addClass( 'ui-state-error' );
                  alert( 'Bitte geben Sie einen Betrag > 0 ein' );
                  return;
               }
               if( $( '#addVoucherPaidDate' ).datepicker( 'getDate' ) == null ) {
                  $( '#addVoucherPaidDate' ).addClass( 'ui-state-error' );
                  alert( 'Bitte wählen Sie ein Datum' );
                  return;
               }
               if( $( '#addVoucherComment' ).val().length < 1 ) {
                  $( '#addVoucherComment' ).addClass( 'ui-state-error' );
                  alert( 'Bitte geben Sie einen Kommentar ein' );
                  return;
               }               

               var user = {
                  'name': $( '#addVoucherUserName' ).val()
               };
               var voucher = {
                  'amount': amount,
                  'paid_date': $( '#addVoucherPaidDate' ).datepicker( 'getDate' ),
                  'comment': $( '#addVoucherComment' ).val(),
                  'repaid': false,
                  'repaid_date': null
               };

               addVoucherForUser( voucher, user, function( err ) {
                  if( err ) {
                     alert( err );
                  }
                  else {
                     $( '#addVoucherDialog' ).dialog( 'close' );
                  }
               } );
            },
            'Abbrechen': function() {
               $( this ).dialog( 'close' );
            }
         },
         open: function() {
            getUsers( function( err, users ) {
               var $userSelectBox = $( '#addVoucherUserName' );
               $userSelectBox.empty();
               users.forEach( function( user ) {
                  $( '<option>', {
                     'value': user.name,
                     'text': user.name
                  } ).appendTo( $userSelectBox );
               } );
            } );
         },
         close: function() {
            $( '#addVoucherDialog input' ).val( '' ).removeClass( 'ui-state-error' );
         }
      } );

      $( '#addVoucherButton' ).click( function() {
         getUsers( function( err, users ) {
            if( users == null || users.length == 0 ) {
               alert( 'Bitte legen Sie mindestens einen Benutzer an' );
               return;
            }
            $( '#addVoucherDialog' ).dialog( 'open', users );
         } );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function addVoucherForUser( voucher, user, callback ) {
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

   function getUsers( callback ) {
      _server.getUsers( callback );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return {
      setServerApi: function( server ) {
         _server = server;
      },
      setupUIElements: setupUIElements
   };

} );