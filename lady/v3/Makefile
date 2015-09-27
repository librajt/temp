#
# usage: make
#

build:

	cp -r src/_p/* src/p/
	
	##lessc --compress src/_c/g.less src/c/g.css
	lessc src/_c/g.less src/c/g.css
	cp -r src/_p/inc/__link_g_release.shtml src/p/inc/_link_g.shtml
	##makecssfile##
	
	rm src/p/inc/__link_*

	node ../../lib/pack/pack -p lady -c v3
    
	date
	
	rm src/html -rf
	shtml2html -s src/p/ -d src/html
#
# usage: make watch
#

watch:
	node ../../lib/watch/watch.js src/_c,src/_p



