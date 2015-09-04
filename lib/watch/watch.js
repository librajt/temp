/**
 *
 *  npm i watchr -g
 *
 */
 
var watchr = require('../node_modules/watchr/out/lib/watchr');
var path = 'src/_c,src/_p';
if (process.argv && process.argv.length > 2) {
    path = process.argv[2];
}
path = path.split(',');
console.log('---------------make watch start---------------');
require('watchr').watch({
    paths: path,
    listeners: {
        error: function(err){
            console.log('an error occured:', err);
        },
        watching: function(err,watcherInstance,isWatching){
            if (err) {
                console.log("watching the path " + watcherInstance.path + " failed with error", err);
            }
        },
        change:function() {
            var make = require('child_process').spawn('make');
            make.stdout.on('data', function (data) {
                console.log('' + data);
            });
            make.stderr.on('data', function (data) {
                console.log('' + data);
            });
            make.on('close', function (code) {
                console.log('---------------make finished---------------');
            });
        }
    }
});