define( function() {

   var _server = null;
   var _template = null;
   var _vouchers = {};

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function initialize() {
      _template = Handlebars.compile( $( '#voucherListingRowTemplate' ).html() );
      _server.getNonRepaidVouchers( function( err, vouchers ) {
         var str = '';
         vouchers.forEach( function( voucher ) {
            if( voucher._id in _vouchers ) {
               return;
            }
            _vouchers[ voucher._id ] = voucher;
            str += applyTemplateOnVoucher( voucher );
         } );
         $( '#voucherListing' ).html( $( '#voucherListing' ).html() + str );
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function handleVoucherAdded( voucher ) {
      if( voucher._id in _vouchers ) {
         return;
      }
      _vouchers[ voucher._id ] = voucher;
      
      var repaidTimeStamp = new Date( voucher.paid_date ).getTime();
      var str = applyTemplateOnVoucher( voucher );
      var found = false;
      $( '#voucherListing' ).find( '.dataTableRow' ).each( function() {
         $row = $( this );
         var sortAttribute = parseInt( $row.data( 'sortAttribute' ), 10 );
         if( sortAttribute <= repaidTimeStamp ) {
            $row.before( str );
            found = true;
            return false;
         }
      } );
      if( !found ) {
         $( '#voucherListing' ).html( $( '#voucherListing' ).html() + str );
      }
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function calculateDebts() {
      var userAmounts = {};
      for( var voucherId in _vouchers ) {
         var voucher = _vouchers[voucherId];
         var user = voucher.users[0];
         if( !( user._id in userAmounts ) ) {
            userAmounts[ user._id ] = 0;
         }
         userAmounts[ user._id ] += voucher.amount;
      };
      
      console.log( userAmounts );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function applyTemplateOnVoucher( voucher ) {
      var repaidDate = new Date( voucher.paid_date );
      return _template( {
         'voucherId': voucher._id,
         'sortAttribute': repaidDate.getTime(),
         'paidAt': repaidDate.format( 'dd.mm.yyyy' ),
         'paidBy': voucher.users[0].name,
         'amount': voucher.amount + ' &euro;',
         'comment': voucher.comment
      } );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return {
      setServerApi: function( server ) {
         _server = server;
      },
      initialize: initialize,
      handleVoucherAdded: handleVoucherAdded
   };

} );