function AddVoucherController( $scope, $filter ) {
   'use strict';
   
   $scope.$emit( 'toggleLoadingIndicator', true, "Lade Benutzer ..." );
   
   $scope.users = [];
   var blankVoucher = {
      'amount': null,
      'paid_at': $filter( 'date' )( new Date(), 'dd.MM.yyyy' ),
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
      var user = {
            name: $scope.voucher.paid_by
      };
      var voucher = _.clone( $scope.voucher );
      delete voucher.paid_by;
      voucher.repaid = false;
      now.addVoucherForUser( voucher, user, function( err, res ) {
         if( err ) {
            console.error( err );
         }
         else {
            console.log( "successful!");
            reset();
         }
      } );
   };
}