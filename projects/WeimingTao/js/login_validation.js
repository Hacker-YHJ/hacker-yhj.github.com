;(function() {
  var $button = $('#login-button');
  var $wellcome = $('#wellcome');
  var $name = $('#banner-username');

  document.loginMsg = {};
  $button.hide();
  $wellcome.hide();
  //$.ajax({
  //  type: 'post',
  //   async: true,
  //   url: 'http://weimingtaoo.duapp.com/login?username=' + name + '&password=' + passwd,
  //   dataType: 'json',
  //   success: function (data) {
  //     validate(data);
  //   }
  //   error: function () {
  //   }
  // });
  function validate(data) {
    if(data&&data.status&&data.status=="success") {
      alert('Y');
    }
    else {
      alert('用户名密码错误，请重新输入');
    }
  }

  function login() {
    $wellcome.show();
    $name.text('YHJ');
  }

  function not_login() {
    $button.show();
  }

  not_login();
  document.loginMsg.name = 'YHJ';

})();