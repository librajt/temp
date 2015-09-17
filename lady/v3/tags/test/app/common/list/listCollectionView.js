
define(['common/list/listCollection'], function (ListCollection) {

    var ListCollectionView = Backbone.View.extend({
        initialize: function(options) {
            this.$el = options.$el;
            this.viewClass = options.viewClass;
            this.modelClass = options.modelClass;
            this.data = options.data;

            this.collection = new ListCollection();
            
            this.listenTo(this.collection, 'add', this.addOne);

            this.setData();
        },
        setData: function() {
            var self = this;
            _.each(self.data, function(obj) {
                self.collection.add(new self.modelClass(obj));
            });
        },
        addOne: function(model) {
            var view = new this.viewClass({model: model});
            this.$el.append(view.render().$el);
        },
        destory: function() {
            this.$el.html('');
        }
    });

    return ListCollectionView;
});