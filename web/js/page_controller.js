define( [ 'js/user_action_controller', 'js/voucher_action_controller' ],
        function( UserActionController, VoucherActionController ) {
   
   var _serverApi = null;
   
   function setServerApi( serverApi ) {
      _serverApi = serverApi;
      _serverApi.handleEvent = function( event ) {
         console.log( event );
      };
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   function initialize() {
      UserActionController.setServerApi( _serverApi );
      UserActionController.setupUIElements();
      VoucherActionController.setServerApi( _serverApi );
      VoucherActionController.setupUIElements();
   }
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   return {
      initialize: initialize,
      setServerApi: setServerApi
   };
   
} );
