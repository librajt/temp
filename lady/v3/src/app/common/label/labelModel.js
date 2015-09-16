
define([], function () {

    var labelModel = Backbone.Model.extend({
        
        defaults: function () {
            return {
                a: '',
                name: "noname"
            };
        }
    });

    return labelModel;
});
