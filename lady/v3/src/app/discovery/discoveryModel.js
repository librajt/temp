
define([], function () {
    var Model2 = Backbone.Model.extend({

        defaults: function () {
            return {
                name: "noname"
            };
        },

        fetch: function () {
            var o = this;
            //可以做一些http请求
            setTimeout(function(){
                o.set({name:'vivi'});
                o.trigger('nameEvent');
            }, 1000);
        }

    });

    return Model2;
});