var async = require( 'async' );
var _storage = null;

exports.initialize = function( storage ) {
   _storage = storage;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.calculateDebts = function( vouchers, callback ) {

   var userToAmount = {};
   var totalAmount = calculateAmounts( userToAmount, vouchers );

   var average = totalAmount / Object.keys( userToAmount ).length;
   var debtors = [];
   var creditors = [];
   Object.keys( userToAmount ).forEach( function( userName ) {
      var entry = userToAmount[userName];
      if( entry.amount >= average ) {
         entry.diff = entry.amount - average;
         creditors.push( entry );
      }
      else {
         entry.diff = average - entry.amount;
         debtors.push( entry );
      }
   } );
   
   // most debts --> lowest getting
   debtors.sort( objectSort( 'diff' ) );
   creditors.sort( objectSort( 'diff' ) ).reverse();

   var debtMapping = createDeptMapping( debtors, creditors );
   process.nextTick( function() {
      callback( null, debtMapping );
   } );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function calculateAmounts( userToAmount, vouchers ) {
   var totalAmount = 0;
   vouchers.forEach( function( voucher ) {
      totalAmount += voucher.amount;
      var userName = voucher.user.name;
      if( !userToAmount[userName] ) {
         userToAmount[userName] = {
            amount: 0,
            user: voucher.user
         };
      }
      userToAmount[userName].amount += voucher.amount;
   } );
   return totalAmount;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createDeptMapping( debtors, creditors ) {
   var debtMapping = [];
   debtors.forEach( function( debtor ) {
      creditors = creditors.filter( function( creditor ) {
         if( debtor.diff == 0 ) {
            // TODO: optimize this: We don't need to iterate through all creditors, if the current debtor has
            // already calculated its debts.
            return true;
         }
         var payment;
         if( creditor.diff > debtor.diff ) {
            payment = debtor.diff;
         }
         else {
            payment = creditor.diff;
         }
         creditor.diff -= payment;
         debtor.diff -= payment;

         debtMapping.push( {
            debtor: debtor.user,
            creditor: creditor.user,
            amount: payment
         } );

         return creditor.diff > 0;
      } );

   } );
   return debtMapping;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function objectSort( field ) {
   return function( a, b ) {
      return a[field] - b[field];
   };
};