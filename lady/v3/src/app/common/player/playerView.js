
define(['text!common/player/playerTpl.html'], function (Tpl) {

    var playerView = Backbone.View.extend({

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        }
    });

    return playerView;
});
