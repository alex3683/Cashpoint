define( function() {
   
   var _server = null;
   var _template = null;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function initialize() {
      _template = Handlebars.compile( $( '#voucherListingRowTemplate' ).html() );
      _server.getNonRepaidVouchers( function( err, vouchers ) {
         var str = '';
         vouchers.forEach( function( voucher ) {
            str += applyTemplateOnVoucher( voucher );
         } );
         $( '#voucherListing' ).html( $( '#voucherListing' ).html() + str );
      } );
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function handleVoucherAdded( voucher ) {
      var repaidTimeStamp = new Date( voucher.paid_date ).getTime();
      var str = applyTemplateOnVoucher( voucher );
      var found = false;
      $( '#voucherListing' ).find( '.dataTableRow' ).each( function() {
         $row = $( this );
         var sortAttribute = parseInt( $row.data( 'sortAttribute' ), 10 );
         if( sortAttribute < repaidTimeStamp ) {
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
   
   function applyTemplateOnVoucher( voucher ) {
      var repaidDate = new Date( voucher.paid_date );
      return _template( {
         'voucherId': voucher._id,
         'sortAttribute': repaidDate.getTime(),
         'paidAt': repaidDate.format( 'dd.mm.yyyy' ),
         'paidBy': voucher.users[ 0 ].name,
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