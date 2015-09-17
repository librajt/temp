
define([], function () {

    var labelModel = Backbone.Model.extend({
        
        defaults: function () {
            return {
                // a: '',
            };
        }
    });

    return labelModel;
});
