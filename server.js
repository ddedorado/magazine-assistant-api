// server.js

// BASE SETUP
// =========================================================

// Call the packages we need
var express    = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose   = require( 'mongoose' );

var app = express();

// Connect the MongoDB with ORM
mongoose.connect( 'mongodb://localhost:27017/magazine-assistant', { useMongoClient: true } );
mongoose.Promise = global.Promise;
var Magazine   = require( './models/magazine' );

// Configure API to use bodyParser(). This will let us get data from a POST
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// Set our port
var port = process.env.PORT || 3000;

// API ROUTES
// =========================================================
var router = express.Router();

// Test route accessed at GET: http://localhost:3000/api
router.get( '/', function( req, res ) {

	res.json( { message : 'Welcome to Magazine Assistent API.' } );
} );

// Routes that end in /magazines
router.route( '/magazines' )

	// Create a Magazine accessed at POST: http://localhost:3000/api/magazines
	.post( function( req, res ) {

		var magazine = new Magazine();
		
		magazine.title       = req.body.title;
		magazine.code        = req.body.code;
		magazine.description = req.body.description;

		//Save the magazine and check for errors
		magazine.save( function( err ) {
			
			if ( err ) {
				
				res.send( err );
			}

			res.json( { message: 'Magazine created.' } );
		} );

	} )

	// Get all magazines accessed at GET: http://localhost:3000/api/magazines
	.get( function( req, res ) {

		Magazine.find( function( err, magazines ) {
			
			if ( err ) {

				res.send( err );
			}

			res.json( magazines );
		} );

	} )

	// Delete all magazines accessed at DELETE: http://localhost:3000/api/magazines
	.delete( function( req, res ) {
		Magazine.remove( function( err, magazines ) { 
			
			if ( err ) {

				res.send( err );
			}

			res.json( { message: 'Successfully deleted.' } );
		} );
	} );


// Routes that end in /magazines/:magazine_id
router.route( '/magazines/:magazine_id' )

	// Get a magazine with that id  accessed at GET: http://localhost:3000/api/magazines/:magazine_id
	.get( function( req, res ) {

		Magazine.findById( req.params.magazine_id, function( err, magazine ) {
			
			if ( err ) {

				res.send( err );
			}

			res.json( magazine );
		} );

	} )

	// Update a magazine with that id  accessed at PUT: http://localhost:3000/api/magazines/:magazine_id
	.put( function( req, res ) {

		Magazine.findById( req.params.magazine_id, function( err, magazine ) {
			
			if ( err ) {

				res.send( err );
			}

			// Update de info
			magazine.title       = req.body.title; 
			magazine.code        = req.body.code; 
			magazine.description = req.body.description; 

			//Save the info
			magazine.save( function( err ) {
			
				if ( err ) {

					res.send( err );
				}

				res.json( { message: 'Magazine updated.' } );

			} );

		} );

	} )

	// Remove a magazine with that id  accessed at DELETE: http://localhost:3000/api/magazines/:magazine_id
	.delete( function( req, res ) {

		Magazine.remove( {
			_id: req.params.magazine_id
		}, function( err, magazine ) { 
			
			if ( err ) {

				res.send( err );
			}

			res.json( { message: 'Successfully deleted.' } );
		} );
	} );

// Prefixed API with /api
app.use( '/api', router );

// START SERVER
// =========================================================
app.listen( port );
console.log( 'Server runs on port: ' + port );

