
define([], function () {

    var activityModel = Backbone.Model.extend({
        
        defaults: function () {
            return {
                a: '',
                name: "noname"
            };
        }
    });

    return activityModel;
});
