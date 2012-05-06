( function( $ ){
   'use strict';
   
   angular.module( 'bootstrapIntegration', [] )
   .directive( 'bsTooltip', function() {
      return function( scope, element, attrs ) {
         $( element ).tooltip( {
            title: attrs[ 'bsTooltip' ],
            delay: { show: 500, hide: 100 }
         } );
      };
   } );
   
} )( window.jQuery );