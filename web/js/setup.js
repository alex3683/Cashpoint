define( function( ) {
   
   var _UserActionController = null;
   var _VoucherActionController = null;
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $( '#addVoucherButton' ).button( {
      icons: {
         primary: 'ui-icon-cart'
      }
   } );
   
   $( '#addUserButton' ).button( {
      icons: {
         primary: 'ui-icon-person'
      }
   } );
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

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

            $( this ).dialog( 'close' );
         },
         'Abbrechen': function() {
            $( this ).dialog( 'close' );
         }
      },
      open: function() {
         _UserActionController.getUsers( function( err, users ) {
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
      $( '#addVoucherDialog' ).dialog( 'open' );
   } );
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

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

            _UserActionController.addUserWithName( $( '#addUserName' ).val(), function( err ) {
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
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   return {
      setUserActionController: function( UserActionController ) {
         _UserActionController = UserActionController;
      },
      setVoucherActionController: function( VoucherActionController ) {
         _VoucherActionController = VoucherActionController;
      }
   };
   
} );