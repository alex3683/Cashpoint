function MainController( $scope, $route, RouteManager ) {
   'use strict';
   
   $scope.menuItems = [];
   $scope.loadingIndicatorVisible = false;
   $scope.loadingIndicatorText = "Lädt ...";
   
   _.each( RouteManager.routes, function( route ) {
      var menuItem = _.clone( route );
      menuItem.active = false;
      $scope.menuItems.push( menuItem );
   } );
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.$on( '$afterRouteChange', function( ) {
      _.each( $scope.menuItems, function( menuItem ) {
         menuItem.active = ( menuItem.controller === $route.current.controller );
      } );
   } );
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.$on( 'toggleLoadingIndicator', function( event, show, label ) {
      console.log( typeof( show ) );
      console.log( "LoadingIndicator %s: %s", show, label );
      
      $scope.loadingIndicatorText = label || '';
      $scope.loadingIndicatorVisible = show;
      if( !$scope.$$phase ) {
         $scope.$digest();
      }
   } );
   
}