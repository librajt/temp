
define([
        'text!discovery/tpl.html', 
        'discovery/discoveryModel',
        'common/list/listCollectionView',
        'common/subject/SubjectView', 'common/subject/SubjectModel',
        'common/player/PlayerView', 'common/player/PlayerModel',
        'common/activity/activityView', 'common/activity/activityModel',
        'common/label/labelView', 'common/label/labelModel'
    ], function (
        tpl, 
        DiscoveryModel,
        ListCollectionView,
        SubjectView, SubjectModel,
        PlayerView, PlayerModel,
        ActivityView, ActivityModel,
        LabelView, LabelModel
    ) {

    var DiscoveryView = Backbone.View.extend({

        initialize: function () {
            this.render();

            this.model = new DiscoveryModel();
            this.listenTo(this.model, 'change', this.renderDiscovery);

            this.model.fetch();
        },

        render: function () {
            this.$el.html(_.template(tpl)).appendTo($('body'));
        },

        renderDiscovery: function () {
            var self = this;

            var explores = this.model.get('explores');
            var labels = this.model.get('labels');
            var experiences = this.model.get('experiences');
            var clubs = this.model.get('clubs');
            var activities = this.model.get('activities');

            var subjectCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#subject'),
                viewClass: SubjectView,
                modelClass: SubjectModel
            });

            // _.each(labels, function(obj, index) {
            //     var view = new SubjectView({}, {obj: obj});
            //     var html = view.render().$el;
            //     self.$el.find('#subject').append(html);
            // });

            var playerCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#player'),
                viewClass: PlayerView,
                modelClass: PlayerModel
            });

            // _.each(labels, function(obj, index) {
            //     var view = new PlayerView({}, {obj: obj});
            //     var html = view.render().$el;
            //     self.$el.find('#player').append(html);
            // });

            var activityCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#activity'),
                viewClass: ActivityView,
                modelClass: ActivityModel
            });

            // _.each(labels, function(obj, index) {
            //     var view = new ActivityView({}, {obj: obj});
            //     var html = view.render().$el;
            //     self.$el.find('#activity').append(html);
            // });

            var labelCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#labels'),
                viewClass: LabelView,
                modelClass: LabelModel
            });

            // _.each(labels, function(obj, index) {
            //     var view = new LabelView({}, {obj: obj});
            //     var html = view.render().$el;
            //     self.$el.find('#labels').append(html);
            // });

        }

    });

    return DiscoveryView;
});
