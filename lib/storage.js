var mongoose = require( 'mongoose' );
var models = {};

exports.initialize = function() {
   var db = mongoose.createConnection( 'mongodb://localhost/cashpoint' );
   defineSchemas( db );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addUser = function( user, callback ) {
   models.User.find( {
      'name': user.name
   }, function( err, users ) {
      if( users && users.length > 0 ) {
         callback( 'The user "' + user.name + '" already exists' );
         return
      }
      
      (new models.User( user )).save( callback );
   } );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addVoucherForUser = function( voucher, user, callback ) {
   models.User.findOne( {
      'name': user.name
   }, function( err, userObj ) {
      if( userObj ) {
         userObj.vouchers.push( voucher );
         userObj.save( callback );
         return
      }

      callback( 'The user "' + user.name + '" doesn\'t exist' );
   } );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addVoucher = function( data, callback ) {
   var voucher = new models.Voucher( data );
   voucher.save( callback );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getUsers = function( callback ) {
   models.User.find( callback );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getNonRepaidVouchers = function( callback ) {
   models.Voucher.find( {
      'repaid': false
   }, callback );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getVouchers = function( callback ) {
   models.Voucher.find( callback );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function defineSchemas( db ) {
   var Schema = mongoose.Schema;

   var VoucherSchema = new Schema( {
      'comment': String,
      'amount': Number,
      'paid_date': Date,
      'repaid_date': Boolean,
      'repaid_date': Date
   } );
   VoucherSchema.path( 'amount' ).validate( function( value ) {
      return value > 0;
   }, 'amount must be greater than 0' );
   models.Voucher = db.model( 'Voucher', VoucherSchema );

   var UserSchema = new Schema( {
      'name': String,
      'vouchers': [ VoucherSchema ]
   } );
   UserSchema.path( 'name' ).validate( function( value ) {
      return value && value.length > 0;
   }, 'name must be at least 1 character long' );
   models.User = db.model( 'User', UserSchema );
};