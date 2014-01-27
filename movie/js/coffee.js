$(document).ready(function() {
    var btn = $('#activitySignIn'), mask = $('#mwMask'), mw = $('#mwActivitySign'), close = mw.find('.close a');
    btn.on('click', function(e) {
        var top, left, height;
        if (document.body.offsetHeight > window.innerHeight) {
            top = (document.body.scrollTop || document.documentElement.scrollTop) + (window.innerHeight / 2) - (mw.height() / 2);
        } else {
            top = document.body.offsetHeight / 2 - (mw.height() / 2);
        }
        mw.css('top', top);
        
        left = (document.body.offsetWidth - mw.width()) / 2;
        if (document.body.offsetWidth < document.body.scrollWidth) {
            left += (document.body.scrollLeft || document.documentElement.scrollLeft);
        }
        mw.css('left', left);
        
        height = document.body.offsetHeight;
        if (height < window.innerHeight) {
            height = window.innerHeight;
        }
        mask.css('height', height);
        
        mask.show();
        mw.show();
    });
    close.on('click', function(e) {
        mask.hide();
        mw.hide();
    });
});