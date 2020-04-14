$(document).ready(function () {
  getData();
  $('#getData').on('click', function () {
    getData();
  });
  function getData() {
    // 検索文字列
    let userId = $('#userId').val();
    //   ページ
    let page = Number($('#nextPage').val());
    // スクロール先
    let scrollTarget = 'scrollTarget' + page;
    $.ajax({
      url:
        '/rest/restaurant/ro/?fields=phot,owner,name,restaurant_id,created_at,address,comment&user__gte=' +
        userId +
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
        if (data.results.length === 0) {
          $('#noHistory').css('display', '');
        }
        data.results.forEach((v) => {
          if (!v.phot) {
            v.phot = $('#defaultImg').val();
          } else {
            v.phot = v.phot.replace('python-django:8080', 'localhost');
          }
          let createdAt = dateFormat.format(
            new Date(v.created_at),
            'yyyy年MM月dd日 hh:mm'
          );
          let limitTo = dateFormat.format(
            new Date(v.limit_to),
            'yyyy年MM月dd日'
          );
          let comment = v.comment;
          let url =
            'https://' + location.host + '/restaurant/' + v.restaurant_id;
          if (v.comment.length > 100) {
            comment = v.comment.substring(0, 100) + '...';
          }
          cardBody =
            cardBody +
            '<div class="card mb-2 shadow">' +
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
            '<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">' +
            '<div class="btn-group mr-2" role="group" aria-label="First group">' +
            '<a href="/restaurant/edit/' +
            v.restaurant_id +
            '/" class="btn btn-outline-info">編集</a>' +
            '</div>' +
            '<div class="btn-group" role="group" aria-label="Third group">' +
            '<button data-restaurant-id="' +
            v.restaurant_id +
            '" class="btn btn-outline-danger" onclick="deleteData(this)">削除</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<ul class="social-icons mb-2 text-center">' +
            '<li><a href="http://www.facebook.com/share.php?u=' +
            url +
            '" class="social-icon"> <i class="fa fa-facebook"></i></a></li>' +
            '<li><a href="https://twitter.com/share?url=' +
            url +
            '" class="social-icon"> <i class="fa fa-twitter"></i></a></li>' +
            '</ul>' +
            '<div class="card-footer">' +
            '<!-- 住所 -->' +
            '<small class="text-muted">' +
            v.address.prefecture.name +
            ' | ' +
            v.address.municipalities.name +
            '<br>' +
            createdAt +
            '<br>' +
            '支援期限 : ' +
            limitTo +
            '</small>' +
            '</div>' +
            '</div>';
          if (cnt % 3 === 0) {
            $('#historyResult')
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
          $('#historyResult')
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
          $('#nextPage').val(page + 1);
          $('#getNextPage').css('display', '');
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

  // // 検索処理
  // $('#serch').on('click', function () {
  //   $('#getNextPage').css('display', '');
  //   $('#nextPage').val(1);
  //   $('#serchResult').empty();
  //   getData();
  // });

  // // エンターでも反応する
  // $(document).keypress(function (event) {
  //   var keycode = event.keyCode ? event.keyCode : event.which;
  //   if (keycode == '13') {
  //     $('#getNextPage').css('display', '');
  //     $('#nextPage').val(1);
  //     $('#serchResult').empty();
  //     getData();
  //   }
  // });

  // 履歴表示
});

// 削除処理
function deleteData(identifier) {
  const id = $(identifier).data('restaurant-id');
  if (confirm('削除を行いますか？')) {
    $.ajax({
      url: '/rest/restaurant/' + id + '/',
      type: 'DELETE',
      async: true,
      headers: {
        'X-CSRFToken': csrftoken,
      },
    })
      // Ajaxリクエストが成功した時発動
      .done((data) => {
        $('#getData').click();
      })
      // Ajaxリクエストが失敗した時発動
      .fail((data) => {
        if (data.status === 403) {
          alert('削除の権限がありません。');
        } else {
          alert('エラーが発生しました。再度画面を読み込んでお試しください');
          console.log(data);
        }
      });
  }
}
//
