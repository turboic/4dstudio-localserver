/**
 * # command to test
 * $ curl 'http://127.0.0.1:8000/nativeFileEdit?projectId=public-johny-ftc4161an&fileName=README.md'
 */

var router	= require('express').Router();
module.exports	= router;

/* GET users listing. */
router.get('/', function(request, response) {
	// get content
	var content	= request.query.content
	var fileName	= request.query.fileName

        // take it from the request
        var content = 'function(){}'
        var basename = 'temporary_name.js'


	// sanity check
	if( fileName === undefined ){
		response.status(400).send('Bad Request. Sorry, you must specify a fileName value.\n');
		return
	}
	if( Object.keys(request.query).length > 2 ){
		response.status(400).send('Bad Request. Sorry, you provided more arguments than necessary.\n');
		return
	}


        var fullName    = require('path').join(tmpDirName, basename)

	// build command line 
	// - What about using $EDITOR. It is way more configurable for the user
	// - well in anycase this server isnt suppose to run on the user computer
	// - so all this is a kludge... no need to try to clean up somthing which isnt 
	var commandLine	= 'subl --wait --new-window '+fullPath;
	// var commandLine	= 'atom --wait '+fullPath;
	console.log('trying to run', commandLine)


	require('child_process').exec(commandLine, function(error, stdout, stderr){
		if (error !== null) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			console.log('exec error: ' + error);
			// return a status ok
			response.status(500).send('Error '+error)
			return
		}
		// return a status ok
		response.json({
			status	: 'ok'
		})
	})
});