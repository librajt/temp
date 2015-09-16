
define(['common/player/playerModel', 'text!common/player/playerTpl.html'], function (Model, Tpl) {

    var playerView = Backbone.View.extend({

        tagName: 'a',

        className: 'player',
        
        initialize: function (models, options) {
            this.model = new Model(options.obj);
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        },
    });

    return playerView;
});
