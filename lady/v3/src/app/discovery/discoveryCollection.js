
define(['text!discovery/tpl.html'], function (tpl) {

    var DiscoverCollection = Backbone.Collection.extend({
        
        url: '/api/discovery',

        initialize: function () {
            this.sliderView = new SliderView()
        },

        parse: function () {
        },

        fetch: function () {
            // 
        }
        
    });

    return DiscoverCollection;
});