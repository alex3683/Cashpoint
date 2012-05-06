function ListVouchersController( $scope ) {
   'use strict';
   
   $scope.$emit( 'toggleLoadingIndicator', true, "Lade Kassenzettel ..." );
   
   $scope.vouchers = [];
   
   function refresh() {
      now.getNonRepaidVouchers( function( err, vouchers ) {
         $scope.vouchers = vouchers;
         $scope.$emit( 'toggleLoadingIndicator', false );
         $scope.$digest();
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
      console.log( "repaid %o", voucher );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.deleteVoucher = function( voucher ) {
      console.log( "delete %o", voucher );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.editVoucher = function( voucher ) {
      console.log( "edit %o", voucher );
   };
   
}