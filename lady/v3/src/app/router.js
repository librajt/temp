define(['backbone'], function () {

    var routesMap = {
        'test': 'module1/controller1.js',
        'discovery(/:name)': 'discovery/discoveryController.js',
        '*actions': 'defaultAction'
    };

    var Router = Backbone.Router.extend({

        routes: routesMap,

        defaultAction: function () {
            console.log('404');
            location.hash = 'test';
        }

    });

    var router = new Router();
    //彻底用on route接管路由的逻辑，这里route是路由对应的value
    router.on('route', function (route, params) {
        require([route], function (controller) {
            if(router.currentController && router.currentController !== controller){
                router.currentController.onRouteChange && router.currentController.onRouteChange();
            }
            router.currentController = controller;
            controller.apply(null, params);     //每个模块约定都返回controller
        });
    });

    return router;
});