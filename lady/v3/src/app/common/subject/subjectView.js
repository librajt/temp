
define(['text!common/subject/subjectTpl.html'], function (Tpl) {

    var subjectView = Backbone.View.extend({

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        }
    });

    return subjectView;
});
