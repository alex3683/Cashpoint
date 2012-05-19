( function() {
   'use strict';
   
   angular.module( 'filters', [] )
   .filter( 'roundHalfUp', function() {
      return function( number ) {
         return Math.round( number * 100 ) / 100;
      };
   } );
   
} )();