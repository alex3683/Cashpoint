var debtCalculator = require( '../lib/debt_calculator' );

buster.testCase( 'DebtCalculator', {

   setUp: function() {
      this.hans = {
         'name': 'Hans'
      };
      this.jupp = {
         'name': 'Jupp'
      };
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   'test that empty list of vouchers results in 0': function( done ) {
      debtCalculator.calculateDebts( [], function( err, result ) {
         assert.equals( null, err );
         assert.equals( result, [] );
         done();
      } );
   },
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   'test that debts are calculated correctly for two users': function( done ) {
      var vouchers = [ {
         'amount': 60,
         'user': this.hans
      }, {
         'amount': 70,
         'user': this.jupp
      }, {
         'amount': 40,
         'user': this.jupp
      } ];
      var self = this;
      debtCalculator.calculateDebts( vouchers, function( err, results ) {
         assert.equals( results[0].debtor, self.hans );
         assert.equals( results[0].creditor, self.jupp );
         assert.equals( results[0].amount, 25 );
         done();
      } );
   }
} );