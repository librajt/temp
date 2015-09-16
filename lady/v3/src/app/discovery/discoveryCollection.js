
define(['text!discovery/tpl.html'], function (tpl) {

    var DiscoverCollection = Backbone.Collection.extend({
        
        url: 'data/discovery.json',

        initialize: function () {
            // this.sliderView = new SliderView()
        },

        parse: function (response, options) {
            // debugger;
            return response;
        },

        // fetch: function () {
        //     $.getJSON(this.url, function(ret) {
        //         debugger;
        //     });
        // }
        
    });

    return DiscoverCollection;
});