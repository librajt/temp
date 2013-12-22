$(document).ready(function() {
    var siteSpot = $('.siteSpot .spot');
    siteSpot.on('mouseover', function(e) {
        siteSpot.removeClass('on');
        $(e.currentTarget).addClass('on');
    });
    var bankerIntro = $('.bankerIntro');
    bankerIntro.on('mouseover', function(e) {
        bankerIntro.removeClass('on');
        $(e.currentTarget).addClass('on');
    });
});