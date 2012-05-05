( function() {
   'use strict';
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   var routes = [ {
      path: '/listVouchers',
      title: 'Kassenzettelübersicht',
      controller: ListVouchersController
   },
   {
      path: '/addVoucher',
      title: 'Kassenzettel eingeben',
      controller: AddVoucherController
   },
   {
      path: '/listUsers',
      title: 'Benutzerübersicht',
      controller: ListUsersController
   },
   {
      path: '/addUser',
      title: 'Benutzer hinzufügen',
      controller: AddUserController
   } ];
   
   var defaultRoute = '/listVouchers';
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   angular.module( 'cashpoint', [] )
   .config( function( $routeProvider ) {
      
      _.each( routes, function( route ) {
         var templateUri = '/views' + route.path + '.html';
         
         $routeProvider.when( route.path, {
            template: templateUri,
            controller: route.controller
         } );
         
      } );
      
      $routeProvider.otherwise( {
         redirectTo: defaultRoute
      } );
      
   } )
   .factory( 'RouteManager', function() {
      return {
         routes: routes,
         defaultRoute: defaultRoute
      };
   } );

} )();