// models/magazine.js

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var MagazineSchema = new Schema( {
	title: String,
	code: String,
	description: String
} );

module.exports = mongoose.model( 'Magazine', MagazineSchema );