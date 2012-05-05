function MainController( $scope, $route, RouteManager ) {
   'use strict';
   
   $scope.menuItems = [];
   
   _.each( RouteManager.routes, function( route ) {
      var menuItem = _.clone( route );
      menuItem.active = false;
      $scope.menuItems.push( menuItem );
   } );
   
   $scope.$on( '$afterRouteChange', function( ) {
      _.each( $scope.menuItems, function( menuItem ) {
         menuItem.active = ( menuItem.controller === $route.current.controller );
      } );
   } );
   
}