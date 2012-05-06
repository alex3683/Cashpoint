( function() {
   'use strict';
   
   angular.module( 'filters', [] )
   .filter( "voucherUser", function() {
      return function( users ) {
         return users[ 0 ].name;
      };
   } );
   
} )();