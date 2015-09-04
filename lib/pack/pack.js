/*
 * @author max<daipingzhang@sohu-inc.com>
 * 
 * 打包命令：node build -p projectName -c v1 -v version -s buildNumber
 * 
 * node pack.js -h 使用帮助
 * 
 * 依赖 node module: commander，使用npm安装
 * npm install commander
 */

// 模块依赖
var program = require('commander');
var fs  = require('fs'),
    path = require('path'),
    CSSCombo = require('../node_modules/css-combo/lib/index'),
    bs = require('../img2base64/css-b64-images');
    
var log = function(msg) {
    console.log('[info] ' + msg);
}

var err = function(msg) {
    console.error('\n\033[91m' + '[error] ' + msg + '\033[0m\n');
}

var BASE_DIR = __dirname + '/' + '../../',
    ENCODING = 'utf8';

program
    .version('0.0.1')
    .usage('node pack <project-name> [options]')
    .option('-p, --project [value]', '项目名称')
    .option('-o, --output [value]', '输出目录')
    .option('-c, --category [value]', '项目类型v1、v2、v3、v4')
    .option('-v, --ver [value]', '版本号')
    .option('-s, --sequence [value]', '打包序列号')
    .option('-b, --buildNumber [value]', '打包序列号')
    .option('-d, --datauri [value]', '图片全部是否使用base64datauri形式')
    .option('-e, --encoding [value]', '编码格式')
    .parse(process.argv);

var project = program.project,
    baseDir = BASE_DIR,
    category = program.category,
    datauri = program.datauri,
    version = program.ver,
    buildNumber = program.sequence || program.buildNumber,
    tag = version ? version + '.' + buildNumber : 'test',
    encoding = program.encoding || ENCODING,
    isDebug = (typeof program.debug == 'undefined' ? true : !!program.debug);

if (!project) {
    err('Command line arguments <-p or --project> is invalid.');
    process.exit(1);
}

if (version && !buildNumber) {
    err('Command line arguments <-b or --buildNumber> is invalid.');
    process.exit(1);
}

var rmdirSync = (function() {
    function iterator(url, dirs) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url);
            inner(url, dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url);
        }
    }
    function inner(path, dirs) {
        var arr = fs.readdirSync(path),
            i, el;
        for (i = 0; el = arr[i++];) {
            iterator(path + "/" + el, dirs);
        }
    }
    return function(dir) {
        var dirs = [];
        try {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];) {
                fs.rmdirSync(el);
            }
        } catch (e) {
        }
    };
})();

var copyFile = function(src, dest, fileName, filters, encode) {
    var canCopy = true,
        code,
        destDirs = dest.split('/'),
        destDirsLen = destDirs.length,
        destDir = '';

    destDirs.forEach(function(dir, i) {
        if (i < destDirsLen - 1) {
            destDir += dir + '/';
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir);
            }
        }
    });

    if (filters) {
        canCopy = (typeof filters === 'string' ? new RegExp(filters, 'i') : filters).test(fileName);
        if(filters.indexOf('!|') !== -1) canCopy = !canCopy;
    }

    if (canCopy) {
        fs.writeFileSync(dest, fs.readFileSync(src, 'binary'), 'binary');
    }
};

var copyDir = function(srcBaseDir, src, destBaseDir, dest, filters, encode) {
    var srcFile = srcBaseDir + src,
        destFile = destBaseDir + dest,
        files;
    if (destFile.charAt(destFile.length - 1) == '/') {
        if (!fs.existsSync(destFile)) {
            fs.mkdirSync(destFile);
        }
        files = fs.readdirSync(srcFile);
        files.forEach(function(file) {
            if (fs.statSync(srcFile + file).isDirectory()) {
                copyDir(srcFile + file + '/', '', destFile + file + '/', '', filters, encode);
            } else {
                copyFile(srcFile + file, destFile + file, file, filters, encode);
            }
        });
    } else {
        copyFile(srcFile, destFile, src, filters, encode);
    }
};

var tagsPath,
    projectPath,
    sharedImagePath,
    tagPath;

var handleCss = function(filePath, subnode) {
    var cssFiles = fs.readdirSync(filePath);
    var i, j, stat;
    for (i = 0, j = cssFiles.length; i < j; i++) {
        stat = fs.lstatSync(filePath + cssFiles[i]);
        if(stat.isDirectory()) {
            handleCss(filePath + cssFiles[i] + '/', subnode + cssFiles[i] + '/');
        }
        else if (stat.isFile() && cssFiles[i].lastIndexOf('.css') !== -1) {
            if (cssFiles[i].indexOf('_') !== 0) {
                console.log(subnode + cssFiles[i]);
                var cfg = {
                    target: projectPath + 'src/c/' + subnode + cssFiles[i],
                    output: tagPath + 'c/' + subnode + cssFiles[i],
                    compress: false
                };
                if (tag !== 'test') {
                    cfg.compress = true;
                }
                CSSCombo.build(cfg);
                var filename = tagPath + 'c/' + subnode + cssFiles[i];
                (function() {
                    var name = filename;
                    bs.fromFile(name, '', function(err, css){
                        css = css.replace(/##name##/g, project + '_' + category);
                        css = css.replace(/##version##/g, tag);
                        css = css.replace(/##update##/g, new Date().toLocaleString().split(' (')[0]);
                        fs.writeFileSync(name, css);
                    }, !!datauri);
                })();
            }
            else {
                log(cssFiles[i] + ' -- [Ignored. Included css file]');
            }
        }
        else {
            log(cssFiles[i] + ' -- [Ignored. Not a css file]');
        }
    }
};


var buildProject = function (project) {
    projectPath = baseDir + project + '/' + (category ? category + '/' : '');
    tagsPath = projectPath + 'tags/';
    sharedImagePath = tagsPath + 'i/';
    tagPath = tagsPath + tag + '/';
    
    // 创建tags目录
    if (!fs.existsSync(tagsPath)) {
        fs.mkdirSync(tagsPath);
    }
    
    // 创建sharedImage目录
    if (fs.existsSync(sharedImagePath)) {
        rmdirSync(sharedImagePath);
    }
    fs.mkdirSync(sharedImagePath);
    copyDir(projectPath + 'i/', '', sharedImagePath, '', '!|rar|psd');
    
    // 创建tag目录
    if (fs.existsSync(tagPath)) {
        rmdirSync(tagPath);
    }
    fs.mkdirSync(tagPath);
    copyDir(projectPath + 'src/', '', tagPath, '', '!|rar|psd');
    
    // 去除less相关目录
    if (fs.existsSync(tagPath + '_c/'))  rmdirSync(tagPath + '_c/');
    if (fs.existsSync(tagPath + '_p/'))  rmdirSync(tagPath + '_p/');
    
    // 清空c目录
    rmdirSync(tagPath + 'c/');
    fs.mkdirSync(tagPath + 'c/');
    
    var cssFilePath = projectPath + 'src/' + 'c/';
    handleCss(cssFilePath, '');
};

buildProject(project);
log('Done building!');
