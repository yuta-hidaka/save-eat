function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
}
var csrftoken = getCookie('csrftoken');
$(document).ready(function () {
  function addCSS_HTML() {
    return new Promise((resolve, reject) => {
      $('#id_email').addClass('form-control');
      $('label').addClass('text-left');
      $('#id_phot').addClass('custom-file-input');
      $('#id_phot').wrap('<div class="custom-file">');
      $('.custom-file').append(
        '<label class="custom-file-label" for="id_phot">写真を選択</label>'
      );

      let html =
        '<label for="zipCode">郵便番号(自動検索):</label>' +
        '<input type="number" maxlength="7" required id="zipCode" placeholder="1620041" />' +
        '<label class="mt-2" for="disp_prefecture">都道府県:</label>' +
        '<p style="font-weight: bold;" id="disp_prefecture"></p>' +
        '<label for="disp_municipalities">市区町村:</label>' +
        '<p style="font-weight: bold;" id="disp_municipalities"></p>' +
        '<label for="disp_street_name">町名:</label>' +
        '<p style="font-weight: bold;" required id="disp_street_name"></p>';
      $('#id_address').after(html);
      $('#id_address').css('display', 'none');
      $('label[for=id_address]').remove();
      $('form').addClass('form');
      $('input').addClass('form-control');
      $(':checkbox').removeClass('form-control');
      $(':radio').removeClass('form-control');
      $('textarea').addClass('form-control');
      $('#id_password1').addClass('form-control');
      $('#id_password2').addClass('form-control');
      $('#id_login').addClass('form-control');
      $('#id_password').addClass('form-control');
      $('.errorlist').addClass('list-group list-group-flush');
      $('.errorlist li').addClass('list-group-item list-group-item-danger');
      $('.errorlist li').css('font-size', 'small');
      $('.errorlist li').css('font-size', 'small');
      $('#id_limit').attr('type', 'date');
      $('#id_limit').attr('required', 'true');
      resolve();
    });
  }

  addCSS_HTML().then(() => {
    function getCookie(c_name) {
      if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + '=');
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(';', c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return '';
    }
    var csrftoken = getCookie('csrftoken');
  });
  dateFormat = {
    _fmt: {
      yyyy: function (date) {
        return date.getFullYear() + '';
      },
      MM: function (date) {
        return ('0' + (date.getMonth() + 1)).slice(-2);
      },
      dd: function (date) {
        return ('0' + date.getDate()).slice(-2);
      },
      hh: function (date) {
        return ('0' + date.getHours()).slice(-2);
      },
      mm: function (date) {
        return ('0' + date.getMinutes()).slice(-2);
      },
      ss: function (date) {
        return ('0' + date.getSeconds()).slice(-2);
      },
    },
    _priority: ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'],
    format: function (date, format) {
      return this._priority.reduce(
        (res, fmt) => res.replace(fmt, this._fmt[fmt](date)),
        format
      );
    },
  };
});

//
