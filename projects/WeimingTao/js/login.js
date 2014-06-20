var Wlogin = function() {
  var name = document.getElementById('input-name').value;
  var passwd = document.getElementById('input-passwd').value;
  var login_data = {}
  login_data.username = name;
  login_data.password = passwd;
  $.ajax({
    type: 'post',
    async: true,
    url: 'http://weimingtaoo.duapp.com/login',
    data: login_data,
    dataType: 'json',
    success: function (data) {
      validate(data);
    },
    error: function () {
    }
  });

  function validate(data) {
    if(data&&data.status&&data.status=="success") {
      location.href='./index.html';
    }
    else {
      alert('用户名密码错误，请重新输入');
    }
  }
};