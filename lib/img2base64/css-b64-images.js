// https://github.com/Filirom1/css-base64-images
var fs = require('fs'),
  Path = require('path'),
  /* Adapted from https://gist.github.com/2594980 */
  imgRegex = /url\s?\(['"]?(.*?)(?=['"]?\))/gi,
  absoluteUrlRegex = /^\//,
  externalUrlRegex = /http/,
  mediatypes = {
    '.eot'       : 'application/vnd.ms-fontobject',
    '.gif'       : 'image/gif',
    '.ico'       : 'image/vnd.microsoft.icon',
    '.jpg'       : 'image/jpeg',
    '.jpeg'      : 'image/jpeg',
    '.otf'       : 'application/x-font-opentype',
    '.png'       : 'image/png',
    '.svg'       : 'image/svg+xml',
    '.ttf'       : 'application/x-font-ttf',
    '.webp'      : 'image/webp',
    '.woff'      : 'application/x-font-woff'
  };

module.exports = {
  fromFile: fromFile,
  fromString: fromString
};

function fromString(css, relativePath, rootPath , cb, all) {
  if(!css.replace && css.toString) css = css.toString();
  var urls = [], match;
  while (match = imgRegex.exec(css)) {
    urls.push(match[1]);
  }
  urls.forEach(function(url) {
    base64img(url, cb)
  });

  function base64img(imageUrl, cb){
    if(externalUrlRegex.test(imageUrl)) {
      return cb(new Error('Skip ' + imageUrl + ' External file.'), css);
    }

    var imagePath;
    if(absoluteUrlRegex.test(imageUrl)) {
      imagePath = Path.join(rootPath, imageUrl.substr(1));
    }else{
      imagePath = Path.join(relativePath, imageUrl);
    }
    if(/\?base64/.test(imageUrl) || all) {
        replaceUrlByB64(imageUrl, imagePath, css, function (err, newCss){
          if(err) return cb(err, css);
          css = newCss;
          cb(null, css);
        });
    }
    else {
        cb(null, css);
    }
  }
}

function fromFile(cssFile, root, cb, all) {
    fromString(fs.readFileSync(cssFile, 'binary'), Path.dirname(cssFile), root, cb, all);
}

function replaceUrlByB64(imageUrl, imagePath, css, cb){
  imagePath = imagePath.replace(/[?#].*/g, '');
  fs.stat(imagePath, function(err, stat){
    if(err) return cb(err, css);
    if (stat.size > 4096){
      return cb(new Error('Skip ' + imageUrl + ' Exceed max size'), css);
    }
    fs.readFile(imagePath, 'base64', function(err, img){
      if(err) return cb(err, css);
      var ext = Path.extname(imagePath);
      var newCss = css.replace(imageUrl, 'data:' + mediatypes[ext] + ';base64,' + img);
      cb(null, newCss);
    });
  });
}

