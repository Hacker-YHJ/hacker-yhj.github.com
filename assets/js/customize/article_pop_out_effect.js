;(function () {
  var
    $articles = $('#main>article'),
    $navi = $('div.dot-navi'),
    $dots,
    windowTop,
    windowBottom,
    current;

  $articles.each( function (i) {
    $navi.append('<div class="outter" no='+i+'></div>');
  });

  $dots = $navi.children();

  $dots.on('click', function() {
    var no = $(this).attr('no');
    if (no > current) {
      $.scrollTo($articles[no], 1000, {
        offset: -350
      });
    }
    else if (no < current) {
      $.scrollTo($articles[no], 1000, {
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
        $(this).css('bottom', ($navi.height()-(i+1)*20));
        $(this).removeClass('current');
      }
      else if (current === i) {
        $(this).css('bottom', '45%');
        $(this).addClass('current');
      }
      else if (current < i) {
        $(this).css('bottom', ($articles.length-i)*20 + $navi.height()*0.10);
        $(this).removeClass('current');
      }
    });
  })

  $(window).scroll();
})();