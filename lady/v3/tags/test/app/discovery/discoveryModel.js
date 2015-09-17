
define([], function () {
    var Model2 = Backbone.Model.extend({

        url: 'data/discovery.json',

        defaults: function () {
            return {
                // name: "noname"
            };
        },
        parse: function (response, options) {
            // debugger;
            return response;
        }

    });

    return Model2;
});