;(function () {
  var
    $frames = $('div.frame'),
    $navi = $('div.dot-navi'),
    $dots;

  $frames.each( function (i) {
    $navi.append('<div class="dot"><div class="description">' +
      $(this).find('h1').text() +
      '</div></div>');
  });

  $dots = $('div.navi>div.dots');

  $dots.on( 'click', function (e, i) {
    console.log(e, i);
    console.log(this);
  });
  $dots.click();
})();