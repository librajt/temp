
define(['text!discovery/tpl.html'], function (tpl) {

    var DiscoveryView = Backbone.View.extend({

        initialize: function () {
            this.collection = new DiscoverCollection();
            this.collection.fetch();
            this.collection.render();
        },

        render: function () {
            this.$el.html(_.template(tpl, {name: this.model.get('name')}));
        }

    });

    return DiscoveryView;
});