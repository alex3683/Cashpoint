function ListUsersController( $scope ) {
   'use strict';

   $scope.$emit( 'toggleLoadingIndicator', true, "Lade Benutzer ..." );
   
   $scope.users = [];
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   now.getUsers( function( err, users ) {
      now.getUserStatistics( function( err, statistics ) {
         $scope.users = _.clone( users );
         _.each( $scope.users, function( user ) {
            user.vouchers = 0;
            user.amount = 0;
            if( statistics[ user.name ] ) {
               user.vouchers = statistics[ user.name ].vouchers;
               user.amount = statistics[ user.name ].amount;
            }
         } );
         $scope.$emit( 'toggleLoadingIndicator', false );
         $scope.$digest();
      } );
   } );
   
}