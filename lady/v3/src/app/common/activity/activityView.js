
define(['common/activity/activityModel', 'text!common/activity/activityTpl.html'], function (Model, Tpl) {

    var activityView = Backbone.View.extend({

        tagName: 'a',

        className: 'activity',
        
        initialize: function (models, options) {
            this.model = new Model(options.obj);
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        },
    });

    return activityView;
});
