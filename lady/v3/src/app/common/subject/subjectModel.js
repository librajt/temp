
define([], function () {

    var subjectModel = Backbone.Model.extend({
        
        defaults: function () {
            return {
                a: '',
                name: "noname"
            };
        }
    });

    return subjectModel;
});
