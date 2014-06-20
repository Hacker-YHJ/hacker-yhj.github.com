;(function () {
  $.ajax({
    type: 'get',
    //type: 'post',
    async: true,
    url: 'http://weimingtaoo.duapp.com/user/get?id=' + document.href_info.id,
    dataType: 'json',
    success: function (data) {
      $.ajax({
        type: 'get',
        async: true,
        url: 'http://weimingtaoo.duapp.com/user/judge',
        dataType: 'json',
        success: function (d) {
          $('#user-showcase span.title').text(data.name);
          if (data.id == d.id)
            $('#user-showcase span.title').append("<button class='pull-right btn btn-info' onClick='location.href = \"./add.html\"'>新增商品</button>");
        },
        error: function () {
          console.error('ajax fail');
        }
      });
      $('#user-desc').text(data.description);
      $('#user-email').text(data.email);
      for (var i in data.sellList) {
        $.ajax({
          type: 'get',
          //type: 'post',
          async: true,
          url: 'http://weimingtaoo.duapp.com/goods?id=' + data.sellList[i],
          dataType: 'json',
          success: function (d) {
            var iId = (d.imageId && d.imageId[0]) ? d.imageId[0] : 1;
            $.ajax({
              type: 'get',
              //type: 'post',
              async: true,
              url: 'http://weimingtaoo.duapp.com/goods/image?id=' + iId,
              dataType: 'text',
              success: function (e) {
                console.log(e);
                $('<div class="col-lg-4 col-sm-4 hero-feature text-center"> <div class="thumbnail"> <a href="./detail.html?id='+d.id+'" class="link-p" style="overflow: hidden; position: relative;"> <img src="'+ e +'" style="position: absolute; width: 250px !important! height: auto; max-width: none; max-height: none; left: -4px !important! top: 0px !important!"> </a> <div class="caption prod-caption"> <h4><a href="./detail.html?id='+d.id+'">' + d.name + '</a></h4> <p>'+d.description+'</p> <p> </p><div class="btn-group"> <a href="./detail.html?id='+d.id+'" class="btn btn-default">￥ '+ d.price + '</a> <a href="././detail.html?id='+d.id+'" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> 购买</a> </div> <p></p> </div> </div> </div>').insertAfter('#sell-label');
              },
              error: function () {
                console.error('ajax fail');
              }
            });
          },
          error: function () {
            console.error('ajax fail');
          }
        });
      }
      for (var i in data.buyCart) {
        $.ajax({
          type: 'get',
          //type: 'post',
          async: true,
          url: 'http://weimingtaoo.duapp.com/goods?id=' + d.butCart[i],
          dataType: 'json',
          success: function (d) {
            var iId = (d.imageId && d.imageId[0]) ? d.imageId[0] : 1;
            $.ajax({
              type: 'get',
              //type: 'post',
              async: true,
              url: 'http://weimingtaoo.duapp.com/goods/image?id=' + iId,
              dataType: 'text',
              success: function (e) {
                $('<div class="col-lg-4 col-sm-4 hero-feature text-center"> <div class="thumbnail"> <a href="./detail.html?id='+d.id+'" class="link-p" style="overflow: hidden; position: relative;"> <img src="'+ e +'" style="position: absolute; width: 250px !important! height: auto; max-width: none; max-height: none; left: -4px !important! top: 0px !important!"> </a> <div class="caption prod-caption"> <h4><a href="./detail.html?id='+d.id+'">' + d.name + '</a></h4> <p>'+d.description+'</p> <p> </p><div class="btn-group"> <a href="./detail.html?id='+d.id+'" class="btn btn-default">￥ '+ d.price + '</a> <a href="././detail.html?id='+d.id+'" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> 购买</a> </div> <p></p> </div> </div> </div>').insertAfter('#buy-label');
              },
              error: function () {
                console.error('ajax fail');
              }
            });
          },
          error: function () {
            console.error('ajax fail');
          }
        });
      }
    },
    error: function () {
      console.error('ajax fail');
    }
  });
})();