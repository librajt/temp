
define(['text!common/label/labelTpl.html'], function (Tpl) {

    var labelView = Backbone.View.extend({

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        }
    });

    return labelView;
});
