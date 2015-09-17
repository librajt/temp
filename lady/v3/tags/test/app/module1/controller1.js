
define(['module1/view1'], function (View) {

    var controller = function () {
        var view = new View();
        view.render('kenko');

        controller.onRouteChange = function () {
            console.log('change1');  //可以做一些销毁工作，例如view.undelegateEvents()
            view.undelegateEvents();
        };
    };
    return controller;
});