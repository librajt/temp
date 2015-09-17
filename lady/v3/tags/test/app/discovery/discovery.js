
define(['discovery/discoveryView'], function (DiscoveryView) {

    var controller = function () {
        var view = new DiscoveryView();

        controller.onRouteChange = function () {
            view.undelegateEvents();
        };
    };

    return controller;
});