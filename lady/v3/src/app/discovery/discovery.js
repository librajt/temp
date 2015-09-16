
define(['discovery/discoveryModel', 'discovery/discoveryView'], function (Model, DiscoveryView) {

    var controller = function () {
        var view = new DiscoveryView();

        controller.onRouteChange = function () {
            console.log('change');
            view.undelegateEvents();
        };
    };

    return controller;
});