define(['backbone'], function () {

    var routesMap = {
        'test': 'module1/controller1.js',
        'discovery(/:name)': 'discovery/discovery.js',
        '*actions': '404'
    };

    var Router = Backbone.Router.extend({

        routes: routesMap,

        404: function () {
            console.log('404');
            location.hash = 'test';
        }

    });

    var router = new Router();
    //彻底用on route接管路由的逻辑，这里route是路由对应的value
    router.on('route', function (route, params) {
        if (route === '404') {
            return;
        }
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