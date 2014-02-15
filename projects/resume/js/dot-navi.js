;(function () {
  var
    $frames = $('div.frame'),
    $navi = $('div.dot-navi'),
    $dots,
    windowTop,
    windowBottom,
    current,
    previous;
  $frames.first().css('height', $(window).height());
  $frames.each( function (i) {
    $navi.append('<div class="dot-container" no=' + i +
      '><div class="dot"></div><div class="description">' +
      $(this).find('h1').text() +
      '</div></div>');
  });

  $dots = $('div.dot-navi div.dot');

  $dots.on( 'click', function (e) {
    console.log(e);
    console.log(this);
  });

  $(window).scroll( function () {
    windowTop = $(window).scrollTop();
    windowBottom = windowTop + $(window).height();
    $frames.each( function (i) {
      thisTop = $(this).offset().top;
      thisBottom = thisTop + $(this).height();
      if (thisBottom - windowTop < 300) { return; }
      else if (windowBottom - thisTop < 0) { return; }
      else {
        previous = current;
        current = i;
        return false;
      }
    });
    if (previous !== current) $dots.eq(previous).removeClass('current');
    $dots.each( function (i) {
      if (current > i) {
        $(this).css('bottom', ($navi.height()-(i+2)*20));
      }
      else if (current === i) {
        $(this).css('bottom', '50%');
        if (previous !== current) $(this).addClass('current');
      }
      else if (current < i) {
        $(this).css('bottom', ($frames.length-i)*20);
      }
    });
  });
  $(window).scroll();
})();