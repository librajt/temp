
define(['discovery/discoveryModel', 'discovery/discoveryView'], function (Model, View) {

    var controller = function () {
        var discoveryView = new DiscoveryView();
        discoveryView.render();

        controller.onRouteChange = function () {
            console.log('change');
            view.undelegateEvents();
        };
    };

    return controller;
});