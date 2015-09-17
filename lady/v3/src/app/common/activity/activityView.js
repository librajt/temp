
define(['text!common/activity/activityTpl.html'], function (Tpl) {

    var activityView = Backbone.View.extend({

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        }
   });

    return activityView;
});
