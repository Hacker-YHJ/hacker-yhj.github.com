var Wpicsub = {};
Wpicsub.allRandom = function (num, slider) {
  if (slider) {
    var $slider = $('ul.bxslider li');
    var n = 0;
    $slider.each( function (i, e) {
      n = ~~(Math.random()*(+num));
      $.ajax({
        type: 'get',
        //type: 'post',
        async: true,
        url: 'http://weimingtaoo.duapp.com/goods?id=' + n,
        dataType: 'json',
        success: function (data) {
          if (data.imageId) {
            Wpicsub.picsub(e, data.imageId[0]);
          }
        },
        error: function () {
          console.error('ajax fail');
        }
      });
    });
  }
  var $pics = $('div.thumbnail');
  $pics.each( function (i, e) {
      n = ~~(Math.random()*(+num));
      $.ajax({
        type: 'get',
        //type: 'post',
        async: true,
        url: 'http://weimingtaoo.duapp.com/goods?id=' + n,
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if (data.imageId) {
            Wpicsub.picsub(e, data.imageId[0], data.id);
            Wpicsub.labelSub(e, data);
          }
        },
        error: function () {
          console.error('ajax fail');
        }
      });
  });
};

Wpicsub.picsub = function (e, picId, goodId) {
  var $e = $(e);
  if (!picId) picId = 1;
  $e.find('a').attr('href', './detail.html?id=' + goodId);
  $.ajax({
    type: 'get',
    //type: 'post',
    async: true,
    url: 'http://weimingtaoo.duapp.com/goods/image?id=' + picId,
    dataType: 'text',
    success: function (data) {
      $e.find('img').attr('src', data);
    },
    error: function() {
      console.error('ajax fail');
    }
  });
};

Wpicsub.labelSub = function (e, data) {
  var $e = $(e);
  $e.find('h4 a').text(data.name);
  $e.find('p').first().text(data.description);
  $e.find('a.btn-default').text('￥ ' + data.price);
};

Wpicsub.detailSub = function (id) {
  var iId = [],
      name,
      email,
      tel,
      desc,
      price,
      ownerId;
  $.ajax({
    type: 'get',
    //type: 'post',
    async: true,
    url: 'http://weimingtaoo.duapp.com/goods?id=' + id,
    dataType: 'json',
    success: function (data) {
      console.log(data);
      if (data.imageId) {
        iId = data.imageId
      }
      name = data.name;
      desc = data.description;
      price = data.price;
      ownerId = data.ownerId;

      $('#good-name').text(data.name);
      $('#person-link').attr('href', './person.html?id=' + ownerId);
      $('input.form-control.input-qty.text-center').attr('value', 2);

      $.ajax({
        type: 'get',
        //type: 'post',
        async: true,
        url: 'http://weimingtaoo.duapp.com/user/get?id=' + data.ownerId,
        dataType: 'json',
        success: function (e) {
          $('#person-link').find('h4').text('出售者：' + e.name);
          $('#person-contact').text(e.email);
          $('#buy-button').hide();
          $('#send-button').hide();
          $('#delete-button').hide();
          if (data.status === "在架上") {
            if (e.id === document.loginMsg.id) {
              console.log('seller');
              $('#delete-button').show();
            }
            else {
              console.log('not seller');
              $('#buy-button').show();
            }
          }
          else if(data.status === "已拍下") {
            if (e.id === document.loginMsg.id) {
              console.log('seller');
              $('#delete-button').show();
              $('#send-button').show();
            }
          }
        },
        error: function () {
          console.error('ajax fail');
        }
      });

      var $wrap = $('div.sp-wrap');
      $wrap.parent().find('h3').text('￥' + price);
      $('#description').text(desc);

      var mainId = iId[0] ? iId[0] : 1;
      var $a = $wrap.find('div.sp-large a');
      $a.attr('href', 'http://weimingtaoo.duapp.com/goods/image?id=' + mainId);
      $.ajax({
        type: 'get',
        //type: 'post',
        async: true,
        url: 'http://weimingtaoo.duapp.com/goods/image?id=' + mainId,
        dataType: 'text',
        success: function (data) {
          $a.find('img').attr('src', data);
        },
        error: function () {
          console.error('ajax fail');
        }
      });

      var $thumbs = $wrap.find('div.sp-thumbs');
      $thumbs.find('a').remove();

      for (var i in iId) {
        $.ajax({
          type: 'get',
          //type: 'post',
          async: true,
          url: 'http://weimingtaoo.duapp.com/goods/image?id=' + iId[i],
          dataType: 'text',
          success: function (data) {
            $a.find('img').attr('src', data);
            $thumbs.append('<a href="http://weimingtaoo.duapp.com/goods/image?id=' + iId[i] + '"><img src="' + data + '"></a>');
          },
          error: function () {
            console.error('ajax fail');
          }
        });
      }
      $thumbs.find('a').first().addClass('sp-current');
    },
    error: function () {
      console.error('ajax fail');
    }
  });
}