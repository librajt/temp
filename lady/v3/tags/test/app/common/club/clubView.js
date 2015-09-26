
define(['text!common/club/clubTpl.html'], function (Tpl) {

    var clubView = Backbone.View.extend({

        render: function () {
            this.$el = _.template(Tpl, this.model.toJSON());
            return this;
        }
    });

    return clubView;
});
