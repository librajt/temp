
define(['common/subject/subjectModel', 'text!common/subject/subjectTpl.html'], function (Model, Tpl) {

    var subjectView = Backbone.View.extend({

        tagName: 'a',

        className: 'subject',
        
        initialize: function (models, options) {
            this.model = new Model(options.obj);
            // this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(_.template(Tpl, this.model.toJSON() ) );
            return this;
        },
    });

    return subjectView;
});
