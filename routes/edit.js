var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, response, next){
	// get variables
	var content	= request.query.content
	var basename	= request.query.basename
        
        // TODO what if there is a 

	// sanity check
	if( basename === undefined ){
		response.status(400).send('Bad Request. Sorry, you must specify a basename value.\n');
		return
	}
	if( content === undefined ){
		response.status(400).send('Bad Request. Sorry, you must specify a content value.\n');
		return
	}
	if( Object.keys(request.query).length > 2 ){
		response.status(400).send('Bad Request. Sorry, you provided more arguments than necessary.\n');
		return
	}

        // build fullName
        var tmpDirName  = 'tmp/'
        var fullName    = require('path').join('tmp/', basename)

        require('fs').writeFile(fullName, content, function(){
                // TODO make that tunable
                // - to support atom
                // var cmdline     = 'atom --wait'
                // - to support sublime text
                var cmdline	= 'subl --wait --new-window';
                cmdline += " \'"+fullName+"\'"

                require('child_process').exec(cmdline, function(error, stdout, stderr){
                        // log the error if needed
        		if (error !== null) {
        			console.log('stdout: ' + stdout);
        			console.log('stderr: ' + stderr);
        			console.log('exec error: ' + error);
        			// return a status ok
        			response.status(500).send('Error '+error)
        			return
        		}
                        // read new content
                        var newContent = require('fs').readFileSync(fullName, 'utf8')
                        // remove the file
                        require('fs').unlinkSync(fullName)
        		// return a status ok
        		response.json({
        			status	: 'ok',
                                newContent : newContent,
        		})
                });
        })
});

module.exports = router;
