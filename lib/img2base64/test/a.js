var fs = require('fs'),
    bs = require('../css-b64-images');

bs.fromFile('a.css', '', function(err, css){
    console.log(err);
    console.log(css);
    fs.writeFile('a.base64.css', css, function(err1){
        if (err1) console.log(err1);
    });
});
