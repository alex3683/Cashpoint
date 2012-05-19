var _ = require( 'underscore' );

var voucherClientFields = [ '_id', 'amount', 'paid_date', 'comment', 'repaid', 'repaid_date' ];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.voucherForDataBase = function( voucher ) {
   var copy = _.pick( voucher, voucherClientFields );
   copy.users = [ voucher.user ];
   return copy;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.voucherFromDataBase = function( voucher ) {
   var copy = _.pick( voucher, voucherClientFields );
   copy.user = voucher.users[ 0 ] || null;
   return copy;
};