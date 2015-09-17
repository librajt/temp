
define([
        'text!discovery/tpl.html', 
        'discovery/discoveryModel',
        'common/slider/carousel-image',
        'common/list/listCollectionView',
        'common/subject/SubjectView', 'common/subject/SubjectModel',
        'common/player/PlayerView', 'common/player/PlayerModel',
        'common/activity/activityView', 'common/activity/activityModel',
        'common/label/labelView', 'common/label/labelModel'
    ], function (
        tpl, 
        DiscoveryModel,
        Slider,
        ListCollectionView,
        SubjectView, SubjectModel,
        PlayerView, PlayerModel,
        ActivityView, ActivityModel,
        LabelView, LabelModel
    ) {

    var DiscoveryView = Backbone.View.extend({

        className: 'page discovery',

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

            var slider = new Slider();
            slider.init({
                target: this.$('#slider'),
                num: this.$('#slider .pages')
            });

            var subjectCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#subject'),
                viewClass: SubjectView,
                modelClass: SubjectModel
            });

            var playerCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#player'),
                viewClass: PlayerView,
                modelClass: PlayerModel
            });

            var activityCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#activity'),
                viewClass: ActivityView,
                modelClass: ActivityModel
            });

            var labelCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#label'),
                viewClass: LabelView,
                modelClass: LabelModel
            });

        }

    });

    return DiscoveryView;
});
