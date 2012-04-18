var debtCalculator = require( '../lib/debt_calculator');

buster.testCase('DebtCalculator', {
    'test that empty list of vouchers results in 0': function (done) {
       debtCalculator.calculateDebts( [], function(err, result) {
          assert.equals(null, err);
          assert.equals(0, result);
          done();
       });
    }
});