$(document).ready(function () {
  $.ajax({
    url: '/rest/restaurant/ro/?restaurant_id=' + restaurant_id,
    type: 'GET',
    async: true,
    headers: {
      'X-CSRFToken': csrftoken,
    },
  })
    // Ajaxリクエストが成功した時発動
    .done((data) => {
      console.log(data);
      let o = data.results[0];
      let adr =
        o.address.prefecture.name +
        ' ' +
        o.address.municipalities.name +
        ' ' +
        o.address.street_name.name +
        ' ' +
        o.street_num +
        ' ' +
        o.bldg;

      let LinkFacebook = 'http://www.facebook.com/share.php?u=' + location.href;
      let LinkTwitter = 'https://twitter.com/share?url=' + location.href;

      if (!o.phot) {
        o.phot = $('#defaultImg').val();
      } else {
        o.phot = o.phot.replace('python-django:8080', 'localhost');
      }
      let createdAt = dateFormat.format(
        new Date(o.created_at),
        'yyyy年MM月dd日 hh:mm'
      );
      let limitTo = dateFormat.format(new Date(o.limit_to), 'yyyy年MM月dd日');
      $('#shopName').html(o.name);
      $('#prefecture').html(o.address.prefecture.name);
      $('#municipalities').html(o.address.municipalities.name);
      $('#limit').html(o.limit);
      $('#owner').html(o.owner);
      $('#comment').html(o.comment);
      $('#phot').attr('src', o.phot);
      $('#benefit').html(o.benefit ? o.benefit : 'なし');
      $('#LinkFacebook').attr('href', LinkFacebook);
      $('#LinkTwitter').attr('href', LinkTwitter);
      $('#zipCode').html(o.address.zip_code);
      $('#address').html(adr);
      $('#createdAt').html(createdAt);
      $('#phone').html(o.phone);
      $('#email').html(o.email);
      $('#webSite').html(o.web_url);
      $('#bankName').html(o.bank_name);
      $('#branch').html(o.branch);
      $('#accountName').html(o.account_name);
      $('#accountNum').html(o.account_num);
      $('#accountType').html(o.account_type);
      $('#limitTo').html(limitTo);

      $(document).attr('title', o.name + 'のお店詳細ページ');
      $('meta[name=description]').attr(
        'content',
        'Save Eat | お店 ' + o.name + ' の詳細ページです。'
      );
    })
    .fail((data) => {
      alert('エラーが発生しました。再度画面を読み込んでお試しください');
      console.log(data);
    });

  $('#showAccountInfo').on('click', function () {
    if (
      confirm(
        '【注意】不正防止のため、入金前に実在するお店か、顔見知りのお店かを、口座人名義とオーナー、屋号が同じか等確認してください。'
      )
    ) {
      $('#accountInfo').fadeIn(10);
      $('html, body').animate(
        {
          scrollTop: parseInt($('#accountInfo').offset().top),
        },
        1000
      );
    }
  });
});

//
