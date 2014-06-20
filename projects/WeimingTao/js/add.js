var Wadd = function() {
  var msg = {};
  msg.name = document.getElementById('input-name').value;
  msg.price = document.getElementById('input-price').value;
  msg.desc = document.getElementById('input-desc').value;
  msg.num = document.getElementById('input-num').value;
  validate(msg);

  function validate(data) {
    if (!data.name) {
      alert('请输入商品名！');
    }
    else if (!data.price) {
      alert('请输入商品价格！');
    }
    else if (NaN === +data.price) {
      alert('请输入正确的价格！');
    }
    else if (!data.num) {
      alert('请输入商品数量！');
    }
    else if (NaN === +data.num) {
      alert('请输入正确的数量！');
    }
    else if (!data.desc) {
      alert('请输入商品描述！');
    }
    else if (!document.ButtonId) {
      alert('请输入商品类别！');
    }
    else {
      var post_data = {};
      post_data.name = data.name;
      post_data.description = data.desc;
      post_data.type = document.ButtonId;
      post_data.price = data.price;
      post_data.number = data.num;
      $('#little-img img').each( function (i, e) {
        post_data['image'+i] = $(e).attr('src');
      });
      console.log(post_data);
      $.ajax({
        type: 'post',
        async: true,
        url: 'http://weimingtaoo.duapp.com/goods/add',
        data: post_data,
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if (data.status === "success") {
            alert('添加成功');
          }
          else {
            alert('添加失败');
          }
          //location.href='./index.html';
        },
        error: function () {
          console.error('ajax fail');
        }
      });
    }
  }
};

var WtypeButtonClicked = function (id) {
  var $buttons = $('div.btn-group.col-sm-8 button');

  document.ButtonId = id;
  $buttons.removeClass('btn-info');
  $($buttons.get(id-1)).addClass('btn-info');
}