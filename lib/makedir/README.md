MPC-CSS项目目录初始化脚本
=================


使用
---------
node makedir <project> -c <classify> [-l -h <htmltype> -f <cssfileNames>]

<project>: 项目名称，如msohu
-c: 项目类型，如v3
-l: 是否使用less进行css开发。有则使用。不用传递参数值
-h: DOCTYPE的类型，如4。默认为5
-f: 项目中的css文件列表。默认为g.css一个，多个文件名时用逗号分隔，不带扩展名，如 home,final


例子
---------
1. 创建msohu的彩版目录，不使用less进行css开发，DOCTYPE使用html4的
node makedir msohu -c v2 -h 4

2. 创建gallery的触版目录，使用less进行css开发，包含两个css文件
node makedir gallery -c v3 -l -f gallery,gallery-port


说明
---------
1. -f会对应生成用于引用less文件或css文件的shtml文件。在建立页面时使用shtml引用的方式，方便进行less引用和css引用的切换。

2. -l会使用less进行css开发。
    1. 脚本会生成对应的直接引用less的shtml文件于_p目录下，开发直接修改less文件即可查看效果。该目录为源码目录，请直接修改些目录下的文件。
    2. less本身支持自动刷新页面的监听，查看_p目录下的页面就会自动刷新，不用手动F5。
    3. link标签的引用使用了shtml单独存放，方便发布时替换less引用为css引用。
    4. 项目根目录会生成MAKEFILE文件，在git命令行中运行make命令可将less文件编译为css文件，并替换相关的shtml引用。
    5. make命令中包含打包test的命令，方便在编译时直接打包test。
    6. 使用make watch命令，可以修改less文件后自动执行make命令。如果还需要执行其它命令，按需要增加即可。

3. src目录下的index文件，用于显示项目中静态文件列表，请指向p目录下的文件。
    1. 如果使用less开发，页面顶部会显示版本切换开关，选择版本后链接会分别指向_p目录和p目录。

4. 项目根目录包含两个cmd文件，用于打包test和正式tag。

