;(function () {
  var goods_array,
      catelogue_sum = [0, 0, 0, 0, 0];
  $.ajax({
    type: 'get',
    //type: 'post',
    async: true,
    url: 'http://weimingtaoo.duapp.com/search?key=' + document.href_info.content,
    dataType: 'json',
    success: function (data) {
      good_array = data;
      var $container = $('div.container.main-container div.col-lg-12.col-md-12.col-sm-12');
      for (var i = 0, j = good_array.length; i < j; ++i) {
        $.ajax({
          type: 'get',
          //type: 'post',
          async: true,
          url: 'http://weimingtaoo.duapp.com/goods?id=' + good_array[i],
          dataType: 'json',
          success: function (d) {
            var iId = (d.imageId && d.imageId[0]) ? d.imageId[0] : 1;
            if (d.type) {
              ++catelogue_sum[d.type];
              $($('div.col-lg-12.col-sm-12 button span').get(d.type)).text(catelogue_sum[d.type]);
              if (catelogue_sum[d.type] ===1) {
                $($('div.col-lg-12.col-sm-12 button').get(d.type)).removeClass('disabled');
              }
            }
            $.ajax({
              type: 'get',
              //type: 'post',
              async: true,
              url: 'http://weimingtaoo.duapp.com/goods/image?id=' + iId,
              dataType: 'text',
              success: function (e) {
                $container.append('<div class="col-lg-3 col-sm-3 hero-feature text-center"> <div class="thumbnail"> <a href="./detail.html?id='+d.id+'" class="link-p" style="overflow: hidden; position: relative;"> <img src="'+e+'" style="position: absolute; width: 250px !important! height: auto; max-width: none; max-height: none; left: -4px !important! top: 0px !important!"> </a> <div class="caption prod-caption"> <h4><a href="./detail.html?id='+d.id+'">' + d.name + '</a></h4> <p>'+d.description+'</p> <p> </p><div class="btn-group"> <a href="./detail.html?id='+d.id+'" class="btn btn-default">￥ '+ d.price + '</a> <a href="././detail.html?id='+d.id+'" class="btn btn-primary"><i class="fa fa-shopping-cart"></i> 购买</a> </div> <p></p> </div> </div> </div>');
              },
              error: function() {
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