#
# usage: make
#

build:

	cp -r src/_p/* src/p/
	
	##makecssfile##
	
	rm src/p/inc/__link_*

	date
	node ../../lib/pack/pack -p ##project## -c ##category##

#
# usage: make watch
#

watch:
	node ../../lib/watch/watch.js src/_c,src/_p


