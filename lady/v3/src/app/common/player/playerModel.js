
define([], function () {

    var playerModel = Backbone.Model.extend({
        
        defaults: function () {
            return {
                a: '',
                name: "noname"
            };
        }
    });

    return playerModel;
});
