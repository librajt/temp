
define([
        'text!discovery/tpl.html', 
        'discovery/discoveryModel',
        'common/slider/carousel-image',
        'common/list/listCollectionView',
        'common/subject/SubjectView', 'common/subject/SubjectModel',
        'common/player/PlayerView', 'common/player/PlayerModel',
        'common/club/clubView', 'common/club/clubModel',
        'common/activity/activityView', 'common/activity/activityModel',
        'common/label/labelView', 'common/label/labelModel'
    ], function (
        tpl, 
        DiscoveryModel,
        Slider,
        ListCollectionView,
        SubjectView, SubjectModel,
        PlayerView, PlayerModel,
        ClubView, ClubModel,
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

            var ads = this.model.get('ads');  // 广告列表
            var labels = this.model.get('labels');  // 玩什么
            var explores = this.model.get('explores');  // 跟谁玩
            var clubs = this.model.get('clubs');  // 去哪玩
            var activities = this.model.get('activities');  // 去哪玩
            var experiences = this.model.get('experiences');

            // var slider = new Slider();
            // slider.init({
            //     target: this.$('#slider'),
            //     num: this.$('#slider .pages')
            // });

            var subjectCollectionView = new ListCollectionView({
                data: labels,
                $el: this.$('#subject'),
                viewClass: SubjectView,
                modelClass: SubjectModel
            });

            var playerCollectionView = new ListCollectionView({
                data: explores,
                $el: this.$('#player'),
                viewClass: PlayerView,
                modelClass: PlayerModel
            });

            var clubCollectionView = new ListCollectionView({
                data: clubs,
                $el: this.$('#club'),
                viewClass: ClubView,
                modelClass: ClubModel
            });

            var activityCollectionView = new ListCollectionView({
                data: activities,
                $el: this.$('#activity'),
                viewClass: ActivityView,
                modelClass: ActivityModel
            });

            var labelCollectionView = new ListCollectionView({
                data: activities,
                $el: this.$('#label'),
                viewClass: LabelView,
                modelClass: LabelModel
            });

        }

    });

    return DiscoveryView;
});
