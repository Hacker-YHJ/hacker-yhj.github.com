var Wregister = function() {
  var msg = {};
  msg.name = document.getElementById('input-name').value;
  msg.passwd = document.getElementById('input-passwd').value;
  msg.confirm = document.getElementById('input-confirm').value;
  msg.desc = document.getElementById('input-desc').value;
  msg.email = document.getElementById('input-email').value;
  validate(msg);

  function validate(data) {
    var r = data.email.match(/([^@\.]+)@(.*)/);
    if (!data.passwd || !data.confirm) {
      alert('请输入密码！');
    }
    else if (data.passwd != data.confirm) {
      alert('两次密码不匹配！请重新输入！');
    }
    else if (!r || r.length < 3) {
      alert('邮箱格式不正确！请重新输入！');
    }
    else if (r[2] != 'pku.edu.cn') {
      alert('请使用PKU邮箱进行注册！');
    }
    else {
      $.ajax({
        type: 'post',
        async: true,
        url: 'http://weimingtaoo.duapp.com/register?username=' + msg.name + '&password=' + data.passwd + '&discription=' + data.desc + '&email=' + data.email,
        dataType: 'json',
        success: function (data) {
          location.href='./index.html';
        },
        error: function () {
          console.error('ajax fail');
        }
      });
    }
  }
};