;(function () {
  var key_array,
      key_sum = [];
  $.ajax({
    type: 'get',
    //type: 'post',
    async: true,
    url: 'http://weimingtaoo.duapp.com/push',
    dataType: 'json',
    success: function (data) {
      key_array = data;
      var $container = $('#goods-container');
      for (var i in key_array) {
        $.ajax({
          type: 'get',
          //type: 'post',
          async: true,
          url: 'http://weimingtaoo.duapp.com/goods?id=' + key_array[i],
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
                $container.append('<div class="col-lg-4 col-sm-4 hero-feature text-center"> <div class="thumbnail"> <a href="./detail.html?id='+d.id+'" class="link-p" style="overflow: hidden; position: relative;"> <img src="' + e + '" style="position: absolute; width: 250px !important! height: auto; max-width: none; max-height: none; left: -4px !important! top: 0px !important!"> </a> <div class="caption prod-caption"> <h4><a href="./detail.html?id='+d.id+'">' + d.name + '</a></h4> <p>'+d.description+'</p> <p> </p><div class="btn-group"> <a href="./detail.html?id='+d.id+'" class="btn btn-default">￥ '+ d.price + '</a> <a href="././detail.html?id='+d.id+'" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> 购买</a> </div> <p></p> </div> </div> </div>');
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