var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, response, next) {
        response.send('respond with a resource\n');

        // take it from the request
        var content = 'function(){}'
        var basename = 'temporary_name.js'

        var tmpDirName  = 'tmp/'

        var fullName    = require('path').join('tmp/', basename)

        require('fs').writeFile(fullName, data, function(){
                // TODO make that tunable
                var cmdline = 'atom --wait'

                cmdline += " \'"+fullName+" \'"

                require('child_process').exec(cmdline, function(error, stdout, stderr){
                        console.log('stdout:', stdout);
                        console.log('stderr:', stderr);
                        if( error !== null ){
                                console.log('exec error: ' + error);
                        }
                });
        // })
});

module.exports = router;
