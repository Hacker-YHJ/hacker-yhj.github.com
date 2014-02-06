;(function () {
  var
    $articles = $('#main>article'),
    windowTop,
    windowBottom;

  $(window).scroll( function () {
    windowTop = $(window).scrollTop();
    windowBottom = windowTop + $(window).height();
    $articles.each( function (i) {
      thisTop = $(this).offset().top;
      thisBottom = thisTop + $(this).height();
      if (thisBottom - windowTop < 0) {
        $(this).addClass('pop-effect-top');
        $(this).removeClass('pop-effect-bottom');
      }
      else if (windowBottom - thisTop < 0) {
        $(this).removeClass('pop-effect-top');
        $(this).addClass('pop-effect-bottom');
      }
      else {
        $(this).removeClass('pop-effect-top');
        $(this).removeClass('pop-effect-bottom');
      }
    });
  });
  $(window).scroll();
})();