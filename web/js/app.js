( function() {
   'use strict';

   angular.module( 'app' ).config( [ '$routeProvider', function( $routeProvider ) {

      $routeProvider
      .when( '/listVouchers', {
         template: 'views/listVouchers.html',
         controller: ListVouchersController
      } )
      .when( '/listUsers', {
         template: 'views/listUsers.html',
         controller: ListUsersController
      } )
      .when( '/addVoucher', {
         template: 'views/addVoucher.html',
         controller: AddVoucherController
      } )
      .when( '/addUser', {
         template: 'views/addUser.html',
         controller: AddUserController
      } )
      .otherwise( {
         redirectTo: '/listVouchers'
      } );
   } ] );

} )();