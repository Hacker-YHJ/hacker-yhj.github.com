;(function () {
  var
    $articles = $('#main>article'),
    $navi,
    $dots,
    windowTop,
    windowBottom,
    current;

  $('body').prepend('<div class="dot-navi"></div>');
  $navi = $('div.dot-navi');
  $articles.each( function (i) {
    $navi.append('<div class="outter" no='+i+'></div>');
  });

  $dots = $navi.children();

  $dots.on('click', function() {
    var no = $(this).attr('no');
    if (no > current) {
      $.scrollTo($articles[no], (no-current)*250, {
        offset: -350
      });
    }
    else if (no < current) {
      $.scrollTo($articles[no], (current-no)*250, {
        offset: 200
      });
    }
  });

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
        current = i;
        $(this).removeClass('pop-effect-top');
        $(this).removeClass('pop-effect-bottom');
      }
    })
    $dots.each( function (i) {
      if (current > i) {
        $(this).css('bottom', ($navi.height()-(i+2)*20));
        $(this).removeClass('current');
      }
      else if (current === i) {
        $(this).css('bottom', '45%');
        $(this).addClass('current');
      }
      else if (current < i) {
        $(this).css('bottom', ($articles.length-i)*20);
        $(this).removeClass('current');
      }
    });
  })

  $(window).scroll();
})();