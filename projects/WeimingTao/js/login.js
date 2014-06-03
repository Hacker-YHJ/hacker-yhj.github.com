var Wlogin = function() {
  var name = document.getElementById('input-name').value;
  var passwd = document.getElementById('input-passwd').value;
  $.ajax({
    type: 'post',
    async: true,
    url: 'http://weimingtaoo.duapp.com/login?username=' + name + '&password=' + passwd,
    dataType: 'json',
    success: function (data) {
      validate(data);
    }
    error: function () {
    }
  });

  function validate(data) {
    if(data&&data.status&&data.status=="success") {
      alert('Y');
    }
    else {
      alert('用户名密码错误，请重新输入');
    }
  }
};