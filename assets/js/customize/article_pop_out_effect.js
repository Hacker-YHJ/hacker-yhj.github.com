;(function () {
  var
    $articles = $('#main>article'),
    $navi,
    $dots,
    windowTop,
    windowBottom,
    previous = 9,
    current = 0;

  $navi = $('div.dot-navi');

  if (0 !== $navi.length) {
    $articles.each( function (i) {
      $navi.append('<div class="outter" no='+i+'></div>');
    });

    $dots = $navi.children();
    $dots.on('click', function() {
      var no = $(this).attr('no');
      $.scrollTo($articles[no], Math.abs(current-no)*250, {
        offset: -100
      });
    });
  }

  $(window).scroll( function () {
    windowTop = $(window).scrollTop();
    windowBottom = windowTop + $(window).height();
    $articles.each( function (i) {
      thisTop = $(this).offset().top;
      thisBottom = thisTop + $(this).height();
      if (thisBottom - windowTop < 100) {
        return;
      }
      else if (windowBottom - thisTop < 0) {
        return;
      }
      else {
        previous = current;
        current = i;
        return false;
      }
    });
    if (previous != current) {
      $dots.eq(previous).removeClass('current');
    }
    $dots.each( function (i) {
      if (current > i) {
        $(this).css('bottom', ($navi.height()-(i+2)*20));
      }
      else if (current === i) {
        $(this).css('bottom', '45%');
        if (previous !== current) $(this).addClass('current');
      }
      else if (current < i) {
        $(this).css('bottom', ($articles.length-i)*20);
      }
    });
  });

  $(window).scroll();
})();