function ListVouchersController( $scope ) {
   'use strict';

   $scope.$emit( 'toggleLoadingIndicator', true, "Lade Kassenzettel ..." );

   $scope.vouchers = [];
   $scope.debts = [];

   function refresh() {
      now.getNonRepaidVouchers( function( err, vouchers ) {
         $scope.vouchers = vouchers;

         now.calculateDebts( vouchers, function( err, debts ) {
            $scope.debts = debts;
            $scope.$emit( 'toggleLoadingIndicator', false );
            $scope.$digest();
         } );
      } );
   }
   refresh();

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.refresh = refresh;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.markAllRepaid = function() {
      console.log( "all ..." );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.markRepaid = function( voucher ) {
      now.setVoucherToRepaid( voucher, function( err, repaidVoucher ) {
         
      } );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.deleteVoucher = function( voucher ) {
      console.log( "delete %o", voucher );
   };

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   $scope.editVoucher = function( voucher ) {
      console.log( "edit %o", voucher );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.$on( 'serverEvent', function( event, serverEvent ) {
      if( serverEvent.type === 'voucherRepaid' ) {
         refresh();
      }
   } );

}