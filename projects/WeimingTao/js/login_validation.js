;(function() {
  var $button = $('#login-button');
  var $wellcome = $('#wellcome');
  var $name = $('#banner-username');

  document.loginMsg = {};
  document.href_info = {}
  $button.hide();
  $wellcome.hide();

  //parse the url and store into document.href_info
  var t_suffix = location.href.match(/([^\?]*)\??(.*)/);
  if (t_suffix&&t_suffix[1]) {
    var t_root = t_suffix[1].match(/[^\/\.]*\.\w+$/);
    document.href_info['__root'] = t_root ? t_root[0] : 'index.html';
  }
  if (t_suffix&&t_suffix[2]) {
    var group_suffix = t_suffix[2].match(/\w+\=[^&]*/g);
    $.each(group_suffix, function (i, e) {
      var t = e.match(/(\w+)\=(.*)/);
      if (t&&t.length>2) {
        document.href_info[t[1]] = t[2];
      }
    });
  }

  //ajax login request
  $.ajax({
    type: 'get',
    async: true,
    url: 'http://weimingtaoo.duapp.com/user/judge',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      parse(data);
    },
    error: function () {
      console.error('ajax fail');
    }
  });

  //ajax pic request
  $.ajax({
    type: 'get',
    async: true,
    url: 'http://weimingtaoo.duapp.com/goods/count?type=0',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      document.loginMsg['count'] = data.count;
      if (document.href_info.__root.match(/index/) ||
          document.href_info.__root.match(/cart/) ||
          document.href_info.__root.match(/about/) ||
          document.href_info.__root.match(/contact/) ||
          document.href_info.__root.match(/detail/)) {
        Wpicsub.allRandom(data.count, true);
      }
      else if (document.href_info.__root.match(/catalogue/)) {
        Wpicsub.allRandom(data.count,false);
      }
    },
    error: function () {
      console.error('ajax fail');
    }
  });

  function parse (data){
    if (!data) return;
    for (var i in data) {
      document.loginMsg[i] = data[i];
    }
    if ("success" === document.loginMsg.status) {
      login(document.loginMsg.name);
      if (document.href_info.__root.match(/subscribe/)) {
        $.ajax({
          type: 'get',
          //type: 'post',
          async: true,
          url: 'http://weimingtaoo.duapp.com/user/get?id=' + document.loginMsg.id,
          dataType: 'json',
          success: function (data) {
            $('#user-name').text(data.name);
            var $table = $('table.table-striped');
            for (var i in data.pushKeywords) {
              $table.append('<tr class="success"><td>' + data.pushKeywrods[i] + '</td> <td><span class="badge">0</span></td></tr>');
            }
          },
          error: function () {
            console.error('ajax fail');
          }
        });
      }
    }
    else not_login();
  }

  function login (name) {
    $wellcome.show();
    $name.attr('href', './person.html?id=' + document.loginMsg.id);
    $name.text(name);
    // test for cart dropdown
    // document.loginMsg.shopingCart.push(1);
    if (document.loginMsg.shopingCart) {
      var sum = 0;
      for (var i in document.loginMsg.shopingCart) {
        $.ajax({
          type: 'get',
          //type: 'post',
          async: true,
          url: 'http://weimingtaoo.duapp.com/goods?id=' + document.loginMsg.shopingCart[i],
          dataType: 'json',
          success: function (data) {
            var $ul = $('ul.dropdown-menu.cart-content');
            $ul.prepend('<li><a href="./detail.html?id=' +  document.loginMsg.shopingCart[i] +'"><b>' + data.name + '</b><span>￥ ' + data.price + '</span></a></li>');
            sum += data.price;
            $('#cart-sum').text(sum);
            if (document.href_info.__root.match(/cart/)) {
              $('#list-sum').text(sum);
              var $tb = $('table.tbl-cart>tbody');
              if (data.imageId&&data.imageId[0]) {
                var iId = data.imageId[0];
              }
              else {
                iId = 1
              }
              $tb.prepend('<tr><td class="hidden-xs"> <a href="./detail.html' + document.loginMsg.shopingCart[i] + '"> <img src="http://weimingtaoo.duapp.com/goods/image?id=' + iId + '" alt="Doge" title="" width="47" height="47"> </a> </td> <td><a href="./detail.html' + document.loginMsg.shopingCart[i] + '">' + data.name + '</a> </td> <td> <div class="input-group bootstrap-touchspin" style=""><span class="input-group-btn"><button class="btn btn-default bootstrap-touchspin-down" type="button">-</button></span><span class="input-group-addon bootstrap-touchspin-prefix"></span><input type="text" name="" value="1" class="input-qty form-control text-center"><span class="input-group-addon bootstrap-touchspin-postfix"></span><span class="input-group-btn"><button class="btn btn-default bootstrap-touchspin-up" type="button">+</button></span></div> </td> <td class="price">￥ '+ data.price + '</td> <td>￥ '+ data.price + '</td> <td class="text-center"> <a href="/cart.html#" class="remove_cart" rel="2"> <i class="fa fa-trash-o"></i> </a> </td> </tr>');
            }
          },
          error: function() {
            console.error('ajax fail');
          }
        });
      }
      $('#cart-num').text(document.loginMsg.shopingCart.length);
    }
  }

  function not_login () {
    $button.show();
    if (document.href_info.__root.match(/cart/) ||
        document.href_info.__root.match(/add/) ||
        document.href_info.__root.match(/subscribe/)) {
      location.href = './login.html';
    }
  }

})();