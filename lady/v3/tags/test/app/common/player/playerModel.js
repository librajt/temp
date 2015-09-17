
define([], function () {

    var playerModel = Backbone.Model.extend({
        
        defaults: function () {
            return {
                // a: '',
            };
        }
    });

    return playerModel;
});
