function ListVouchersController( $scope ) {
   'use strict';
   
   $scope.vouchers = [];
   console.log( Object.keys( now ) );
   now.getVouchers( function( err, vouchers ) {
      console.log( err );
      console.log( vouchers );
      $scope.vouchers = vouchers;
   } );
}