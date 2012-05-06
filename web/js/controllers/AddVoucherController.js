function AddVoucherController( $scope ) {
   'use strict';
   
   $scope.$emit( 'toggleLoadingIndicator', true, "Lade Benutzer ..." );

   $scope.users = [];
   var blankVoucher = {
      'amount': null,
      'paid_at': null,
      'paid_by': null,
      'comment': ''
   };
   function reset() {
      $scope.voucher = _.clone( blankVoucher );
   }
   reset();
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   now.getUsers( function( err, users ) {
      $scope.users = _.clone( users );
      $scope.$emit( 'toggleLoadingIndicator', false );
      $scope.$digest();
   } );
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.addVoucher = function() {
      console.log( $scope.voucher );
   };
}