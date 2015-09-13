;
(function() {

    var Workspace = Backbone.Router.extend({

        routes: {
            "help": "help", // #help
            "search/:query": "search", // #search/kiwis
            "search/:query/p:page": "search" // #search/kiwis/p7
        },

        help: function() {
            $('.help').show();
            $('.help').html('help me');
        },

        search: function(query, page) {
            $('.search').show();
            $('.search').html('search query: ' + query + ', page: ' + page);
        },

        destroy: function() {
            console.log('destory');
        }

    });

    var space = new Workspace();

    Backbone.history.start();


})();