/*
 * @author max<daipingzhang@sohu-inc.com>
 * 
 * 打包命令：node makedir projectName -c v1 -v version -l -h htmltype -f cssfileNames
 * 
 * node makedir.js -h 使用帮助
 * 
 * 依赖 node module: commander，使用npm安装
 * npm install commander
 */

// 模块依赖
var program = require('commander');
var fs  = require('fs');

var log = function(msg) {
    console.log('[info] ' + msg);
}

var err = function(msg) {
    console.error('\n\033[91m' + '[error] ' + msg + '\033[0m\n');
}

var exit = function() {
    process.exit(1);
}

var BASE_DIR = __dirname + '/' + '../../';

program
    .version('0.0.1')
    .usage('node makedir <project-name> [options]')
    .option('-c, --category [value]', '项目类型v1、v2、v3、v4')
    .option('-l, --less', '是否使用LESS管理CSS源码')
    .option('-h, --htmltype [value]', 'HTML版本，值为4或5')
    .option('-f, --files [value,value]', 'css文件名列表')
    .parse(process.argv);

var project = process.argv[2],
    baseDir = BASE_DIR,
    category = program.category,
    less = program.less ? true : false,
    htmltype = +program.htmltype || 5,
    cssfiles = program.files || 'g',
    isDebug = (typeof program.debug == 'undefined' ? true : !!program.debug);

if (!project) {
    err('Command line arguments <project-name> is invalid.');
    exit();
}

if (!category) {
    err('Command line arguments <-c or --category> is invalid.');
    exit();
}

cssfiles = cssfiles.split(',');

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

var createFile = function (src, dest, level, filename, newname) {
    copyFile(src + level + filename, dest + level + (newname || filename));
};

var createCssLink = function (src, dest, cssFile, filever) {
    var level = 'src/_p/inc/';
    var file = fs.readFileSync(src + level + '__link' + '_' + filever + '.shtml', 'utf-8');
    file = file.replace(/##filename##/g, cssFile);
    fs.writeFileSync(dest + level + '__link_' + cssFile + '_' + filever + '.shtml', file,  'utf-8');
};

var formate = function (file) {
    file = file.replace(/##project##/g, project);
    file = file.replace(/##htmltype##/g, htmltype);
    file = file.replace(/##category##/g, category);
    return file;
};



var projectPath,
    templatePath,
    projectPath,
    i, j = cssfiles.length, cssfile;

var buildProject = function (project) {
    templatePath = baseDir + 'lib/makedir/dir/';
    projectPath = baseDir + project + '/' + category + '/';
    
    // 创建 project 目录
    if (!fs.existsSync(baseDir + project + '/')) {
        fs.mkdirSync(baseDir + project + '/');
    }
    
    // 创建 category 目录
    if (fs.existsSync(projectPath)) {
        err('project [ ' + project + ' - ' + category + ' ] exist');
        exit();
    }
    fs.mkdirSync(projectPath);
    
    // 创建 i 目录
    fs.mkdirSync(projectPath + 'i/');
    
    // 创建 src 目录
    fs.mkdirSync(projectPath + 'src/');
    
    // 创建 c 目录
    fs.mkdirSync(projectPath + 'src/c');
    
    // 创建 p 目录
    fs.mkdirSync(projectPath + 'src/p');
    fs.mkdirSync(projectPath + 'src/p/inc');
    
    // 创建 _c 目录
    fs.mkdirSync(projectPath + 'src/_c');
    
    // 创建 _p 目录
    fs.mkdirSync(projectPath + 'src/_p');
    fs.mkdirSync(projectPath + 'src/_p/inc');
    
    // 创建基础文件
    // -- css
    for(i = 0; i < j; i++) {
        createFile(templatePath, projectPath, 'src/_c/', 'g.less', cssfiles[i] + '.less');
    }
    createFile(templatePath, projectPath, 'src/_c/', '_reset_h' + htmltype + '.less', '_reset.less');
    
    // -- link
    for(i = 0; i < j; i++) {
        cssfile = cssfiles[i];
        createCssLink(templatePath, projectPath, cssfile, 'dev');
        createCssLink(templatePath, projectPath, cssfile, 'release');
        createFile(projectPath, projectPath, 'src/_p/inc/', '__link_' + cssfile + '_dev.shtml', '_link_' + cssfile + '.shtml');
    }
    
    // -- head
    createFile(templatePath, projectPath, 'src/_p/inc/', '__head_h' + htmltype + '.shtml', '_head.shtml');
    
    // -- new file
    createFile(templatePath, projectPath, 'src/_p/', 'untitled.shtml');

    if (less) {
        // 创建 Makefile 文件
        var makefile = fs.readFileSync(templatePath + 'Makefile', 'binary'), sh;
        makefile = formate(makefile);
        for(i = 0; i < j; i++) {
            cssfile = cssfiles[i];
            sh = [
                'lessc --compress src/_c/' + cssfile + '.less  src/c/' + cssfile + '.css\r\n',
                '\tcp -r src/_p/inc/__link_' + cssfile + '_release.shtml src/p/inc/_link_' + cssfile + '.shtml\r\n',
                '\t##makecssfile##'
            ].join('');
            makefile = makefile.replace(/##makecssfile##/g, sh);
        }
        makefile = formate(makefile);
        
        fs.writeFile(projectPath + 'Makefile', makefile, function (err) {
            if (err) console.log(err);
        });
    }
    else {
        for(i = 0; i < j; i++) {
            createFile(templatePath, projectPath, 'src/c/', 'g.css', cssfiles[i] + '.css');
        }
        createFile(templatePath, projectPath, 'src/c/', '_reset_h' + htmltype + '.css', '_reset.css');
        
        copyDir(projectPath + 'src/_p/', '', projectPath + 'src/p/', '');
        
        for(i = 0; i < j; i++) {
            cssfile = cssfiles[i];
            createFile(projectPath, projectPath, 'src/p/inc/', '__link_' + cssfile + '_release.shtml', '_link_' + cssfile + '.shtml');
            fs.unlink(projectPath + 'src/p/inc/__link_' + cssfile + '_dev.shtml');
            fs.unlink(projectPath + 'src/p/inc/__link_' + cssfile + '_release.shtml');
        }
        
        //fs.unlink(projectPath + 'src/p/inc/__head_h' + htmltype + '.shtml');
        
        rmdirSync(projectPath + 'src/_c/');
        rmdirSync(projectPath + 'src/_p/');
    }
    
    // 创建索引文件
    var indexfile = fs.readFileSync(templatePath + 'src/index.html', 'utf-8');
    if (!less) indexfile = indexfile.replace(/<!--ver-->/g, '<!--ver');
    fs.writeFile(projectPath + 'src/index.html', indexfile, function (err) {
        if (err) console.log(err);
    });
    
    // 创建 tag_test 文件
    var tag_test_file = fs.readFileSync(templatePath + 'tag_test.cmd', 'binary');
    tag_test_file = formate(tag_test_file);
    fs.writeFile(projectPath + 'tag_test.cmd', tag_test_file, function (err) {
        if (err) console.log(err);
    });
    
    // 创建 tag 文件
    var tag_file = fs.readFileSync(templatePath + 'tag.cmd', 'binary');
    tag_file = formate(tag_file);
    fs.writeFile(projectPath + 'tags.cmd', tag_file, function (err) {
        if (err) console.log(err);
    });
};

buildProject(project);

// TODO file add


log('Done!');
