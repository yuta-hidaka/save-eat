$(document).ready(function () {
  getData();
  function getData() {
    //   ページ
    let page = Number($('#nextPage').val());
    // 期限が本日までのデータを検索
    let today = dateFormat.format(new Date(), 'yyyy-MM-dd');
    // スクロール先
    let scrollTarget = 'scrollTarget' + page;
    $.ajax({
      url:
        '/rest/restaurant/ro/?limit_to__gte=' +
        today +
        '&fields=limit_to,phot,owner,name,restaurant_id,created_at,address,comment&search=' +
        '&page=' +
        page,
      type: 'GET',
      async: true,
      headers: {
        'X-CSRFToken': csrftoken,
      },
    })
      // Ajaxリクエストが成功した時発動
      .done((data) => {
        let cardBody = '';
        let cnt = 1;
        data.results.forEach((v) => {
          if (!v.phot) {
            v.phot = $('#defaultImg').val();
          } else {
            v.phot = v.phot.replace('python-django:8080', 'localhost');
            v.phot = v.phot.replace('http://python-django:4040', '');
            console.log(v.phot);
          }

          let comment = v.comment;
          let url =
            'https://' + location.host + '/restaurant/' + v.restaurant_id;
          if (v.comment.length > 100) {
            comment = v.comment.substring(0, 100) + '...';
          }
          let createdAt = dateFormat.format(
            new Date(v.created_at),
            'yyyy年MM月dd日 hh:mm'
          );
          let limitTo = dateFormat.format(
            new Date(v.limit_to),
            'yyyy年MM月dd日'
          );
          cardBody =
            cardBody +
            '<div class="card m-2 shadow">' +
            '<img src="' +
            v.phot +
            '" class="card-img-top" alt="phot">' +
            '<div class="card-body">' +
            '<!-- お店の名前 -->' +
            '<h5 class="card-title">' +
            v.name +
            '</h5>' +
            '<!-- お店のオーナー -->' +
            '<small class="mb-2 text-muted card-title">owner : ' +
            v.owner +
            '</small>' +
            '<!-- 一言コメント -->' +
            '<p class="card-text">' +
            comment +
            '</p>' +
            '<a href="/restaurant/' +
            v.restaurant_id +
            '/" class="btn btn-outline-info">支援する>></a>' +
            '</div>' +
            '<div class="footer-social-icons m-auto text-center">' +
            '<ul class="social-icons">' +
            '<li><a href="http://www.facebook.com/share.php?u=' +
            url +
            '" class="social-icon"> <i class="fa fa-facebook"></i></a></li>' +
            '<li><a href="https://twitter.com/share?url=' +
            url +
            '" class="social-icon"> <i class="fa fa-twitter"></i></a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="card-footer">' +
            '<!-- 住所 -->' +
            '<small class="text-muted">' +
            v.address.prefecture.name +
            ' | ' +
            v.address.municipalities.name +
            '<br>' +
            '作成 : ' +
            createdAt +
            '<br>' +
            '支援期限 : ' +
            limitTo +
            '</small>' +
            '</div>' +
            '</div>';
          if (cnt % 3 === 0) {
            $('#searchResult')
              .append(
                '<div class="card-deck" id="' +
                  scrollTarget +
                  '">' +
                  cardBody +
                  '</div>'
              )
              .hide()
              .fadeIn(500);
            cnt = 1;
            cardBody = '';
          } else {
            cnt++;
          }
        });

        if (cardBody) {
          if (cnt === 3) {
            cardBody = cardBody + '<div class="card m-2 shadow"></div>';
          } else if (cnt === 2) {
            cardBody =
              cardBody +
              '<div class="card m-2 shadow"></div>' +
              '<div class="card m-2 shadow"></div>';
          }
          $('#searchResult')
            .append(
              '<div class="card-deck" id="' +
                scrollTarget +
                '">' +
                cardBody +
                '</div>'
            )
            .hide()
            .fadeIn(500);
        }

        if (data.next !== null) {
          $('#getNextPage').css('display', '');
          $('#nextPage').val(page + 1);
        } else {
          $('#getNextPage').css('display', 'none');
        }

        if (page > 1) {
          $('html, body').animate(
            {
              scrollTop: parseInt($('#' + scrollTarget).offset().top),
            },
            1000
          );
        }
      })
      // Ajaxリクエストが失敗した時発動
      .fail((data) => {
        alert('エラーが発生しました。再度画面を読み込んでお試しください');
        console.log(data);
      });
  }

  // 次のページ
  $('#getNextPage').on('click', function () {
    getData();
  });

  // 検索処理
  $('#serch').on('click', function () {
    $('#getNextPage').css('display', '');
    $('#nextPage').val(1);
    $('#serchResult').empty();
    getData();
  });

  // エンターでも反応する
  $(document).keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      $('#getNextPage').css('display', '');
      $('#nextPage').val(1);
      $('#serchResult').empty();
      getData();
    }
  });

  // 履歴表示
});

//
