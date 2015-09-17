
define([], function () {

    var subjectModel = Backbone.Model.extend({
        
        defaults: function () {
            return {
                // a: '',
            };
        }
    });

    return subjectModel;
});
