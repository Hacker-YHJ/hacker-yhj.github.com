(function() {
  var landing;
  landing = {
    init: function() {
      $('form.email-upload').validate({
        rules: {
          email: {
            required: true,
            email: true
          }
        },
        invalidHandler: function(event, v) {
          return $('input').val('');
        },
        submitHandler: function(form) {
          console.log('submit');
          return $(form).submit;
        },
        highlight: function(elem) {
          return $(elem).attr('placeholder', "请输入正确的邮箱地址");
        },
        errorPlacement: function(err, elem) {
          return true;
        }
      });
      $('.sign-up.upload .submit-button').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        return $('#afterSubmit').fadeIn();
      });
      return $('#afterSubmit .submit-button').click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        return $('#afterSubmit').fadeOut();
      });
    }
  };
  $(document).ready(landing.init);
  return $(document).on('page:load', landing.init);
})();
