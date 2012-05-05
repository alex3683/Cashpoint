define( [ 'js/user_action_controller', 'js/voucher_action_controller', 'js/voucher_listing_controller' ],
        function( UserActionController, VoucherActionController, VoucherListingController ) {
   
   var _serverApi = null;
   
   function setServerApi( serverApi ) {
      _serverApi = serverApi;
      _serverApi.handleEvent = function( event ) {
         //console.log( event );
         switch( event.type ) {
            case 'voucherAdded':
               VoucherListingController.handleVoucherAdded( event.data );
               break;
         }
      };
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function initialize() {
      UserActionController.setServerApi( _serverApi );
      UserActionController.setupUIElements();
      VoucherActionController.setServerApi( _serverApi );
      VoucherActionController.setupUIElements();

      VoucherListingController.setServerApi( _serverApi );
      VoucherListingController.initialize();
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   return {
      initialize: initialize,
      setServerApi: setServerApi
   };
   
} );
