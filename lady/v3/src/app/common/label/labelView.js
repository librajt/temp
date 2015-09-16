
define(['common/label/labelModel', 'text!common/label/labelTpl.html'], function (Model, Tpl) {

    var labelView = Backbone.View.extend({

        tagName: 'a',

        className: 'label',
        
        initialize: function (models, options) {
            this.model = new Model(options.obj);
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        },
    });

    return labelView;
});
