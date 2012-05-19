function AddUserController( $scope ) {
   'use strict';
   
   var blankUser = {
      'name': ''
   };
   function reset() {
      $scope.user = _.clone( blankUser );
   }
   reset();
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.addUser = function() {
      console.log( 'adding %o', $scope.user );
      now.addUser( $scope.user, function( err, user ) {
         console.log( err );
         console.log( user );
         if( !err ) {
            reset();
            $scope.$digest();
         }
      } );
   };
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   $scope.reset = reset;
}