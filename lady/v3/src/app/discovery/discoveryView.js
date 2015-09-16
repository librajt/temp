
define([
        'text!discovery/tpl.html', 
        'discovery/discoveryCollection',
        'common/subject/subjectView',
        'common/player/playerView',
        'common/activity/activityView',
        'common/label/labelView',
    ], function (
        tpl, 
        DiscoveryCollection, 
        SubjectView,
        PlayerView,
        ActivityView,
        LabelView
    ) {

    var DiscoveryView = Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection = new DiscoveryCollection();

            // this.listenTo(this.collection, 'change', this.render);
            // this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'add', this.renderDiscovery);

            this.collection.fetch();
        },

        render: function () {
            this.$el.html(_.template(tpl)).appendTo($('body'));
        },

        renderDiscovery: function () {
            var self = this;

            var collection = this.collection.models[0];

            var explores = collection.get('explores');
            var labels = collection.get('labels');
            var experiences = collection.get('experiences');
            var clubs = collection.get('clubs');
            var activities = collection.get('activities');

            _.each(labels, function(obj, index) {
                var view = new SubjectView({}, {obj: obj});
                var html = view.render().$el;
                self.$el.find('#subject').append(html);
            });

            _.each(labels, function(obj, index) {
                var view = new PlayerView({}, {obj: obj});
                var html = view.render().$el;
                self.$el.find('#player').append(html);
            });

            _.each(labels, function(obj, index) {
                var view = new ActivityView({}, {obj: obj});
                var html = view.render().$el;
                self.$el.find('#activity').append(html);
            });

            _.each(labels, function(obj, index) {
                var view = new LabelView({}, {obj: obj});
                var html = view.render().$el;
                self.$el.find('#labels').append(html);
            });

        }

    });

    return DiscoveryView;
});
