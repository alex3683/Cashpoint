var mongoose = require( 'mongoose' );
var models = {};
var _eventRouter = function() {};

exports.initialize = function( dataBaseURL ) {
   var db = mongoose.createConnection( dataBaseURL );
   defineSchemas( db );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addUser = function( user, callback ) {
   models.User.find( {
      'name': user.name
   }, function( err, users ) {
      if( users && users.length > 0 ) {
         callback( 'The user "' + user.name + '" already exists' );
         return;
      }
      
      (new models.User( user )).save( createEventEmittingCallback( callback, 'userAdded' ) );
   } );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addVoucherForUser = function( voucher, user, callback ) {
   models.User.findOne( {
      'name': user.name
   }, function( err, userObj ) {
      if( userObj ) {
         voucher.users = [ userObj ];
         (new models.Voucher( voucher )).save( createEventEmittingCallback( callback, 'voucherAdded' ) );
         return;
      }

      callback( 'The user "' + user.name + '" doesn\'t exist' );
   } );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getUsers = function( callback ) {
   models.User.find( callback );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getNonRepaidVouchers = function( callback ) {
   models.Voucher.where( 'repaid', false ).sort( 'paid_date', -1 ).run( callback );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getVouchers = function( callback ) {
   models.Voucher.find( callback );
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.setEventRouter = function( eventRouter ) {
   _eventRouter = eventRouter;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createEventEmittingCallback( callback, eventType )
{
   return function( err, data ) {
      callback( err, data );
      if( !err ) {
         _eventRouter( {
            'type': eventType,
            'data': data
         } );
      }
   };
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function defineSchemas( db ) {
   var Schema = mongoose.Schema;

   var UserSchema = new Schema( {
      'name': String
   } );
   
   UserSchema.path( 'name' ).validate( function( value ) {
      return value && value.length > 0;
   }, 'name must be at least 1 character long' );
   models.User = db.model( 'User', UserSchema );

   var VoucherSchema = new Schema( {
      'comment': String,
      'amount': Number,
      'paid_date': Date,
      'repaid': Boolean,
      'repaid_date': Date,
      'users': [ UserSchema ]
   } );
   
   VoucherSchema.path( 'amount' ).validate( function( value ) {
      return value > 0;
   }, 'amount must be greater than 0' );
   
   VoucherSchema.path( 'users' ).validate( function( value ) {
      return value.length === 1;
   }, 'a voucher must be assigned to a user' );
   
   models.Voucher = db.model( 'Voucher', VoucherSchema );
};