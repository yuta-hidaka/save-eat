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
      $('textarea').addClass('form-control');
      $('#id_password1').addClass('form-control');
      $('#id_password2').addClass('form-control');
      $('#id_login').addClass('form-control');
      $('#id_password').addClass('form-control');
      $('.errorlist').addClass('list-group list-group-flush');
      $('.errorlist li').addClass('list-group-item list-group-item-danger');
      $('.errorlist li').css('font-size', 'small');

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

    $('#zipCode').on('change', function () {
      let zipCode = $('#zipCode').val().replace('-', '');
      $.ajax({
        url: 'https://zip-cloud.appspot.com/api/search?zipcode=' + zipCode,
        type: 'GET',
        headers: {
          'Access-Control-Allow-Origin': 'https://zip-cloud.appspot.com',
        },
        dataType: 'JSONP',
        jsonpCallback: 'callbackFnc',
        type: 'GET',
        async: false,
        crossDomain: true,
      })
        // Ajaxリクエストが成功した時発動
        .done((data) => {
          if (data.results) {
            let prefecture = data.results[0].address1;
            let municipalities = data.results[0].address2;
            let streetName = data.results[0].address3;

            $('#disp_prefecture').html(prefecture);
            $('#disp_municipalities').html(municipalities);
            $('#disp_street_name').html(streetName);

            let prefecture_id = null;
            let municipalities_id = null;
            let streetName_id = null;
            let address_id = null;
            $.when().then(function () {
              getOrCreatePrefecture(prefecture).then((v) => {
                prefecture_id = v;
                getOrCreateMunicipalities(municipalities).then((v) => {
                  municipalities_id = v;
                  getOrCreateStreetName(streetName).then((v) => {
                    streetName_id = v;
                    const addressData = {
                      zip_code: zipCode,
                      prefecture: prefecture_id,
                      municipalities: municipalities_id,
                      street_name: streetName_id,
                    };
                    getOrCreateAddress(addressData).then((v) => {
                      if (v.created) {
                        address_id = v.data.address_id;
                        $('#id_address').append(
                          $(
                            '<option value="' +
                              address_id +
                              '">' +
                              zipCode +
                              '</option>'
                          )
                        );
                      } else {
                        address_id = v.data.results[0].address_id;
                      }
                      $('#id_address').val(address_id);
                    });
                  });
                });
              });
            });
          } else {
            alert('郵便番号が正しくありません');
          }
          // getOrCreateAddress(target);
        })
        // Ajaxリクエストが失敗した時発動
        .fail((data) => {
          alert('エラーが発生しました。再度画面を読み込んでお試しください');
          console.log(data);
        });
    });

    //   都道府県を登録または取得する
    async function getOrCreatePrefecture(target) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/rest/restaurant/prefecture/?name=' + target,
          type: 'GET',
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
          // Ajaxリクエストが成功した時発動
          .done((data) => {
            if (data.count === 0) {
              let postData = { name: target };
              createData(postData, 'prefecture').then((res) => {
                resolve(res.prefecture_id);
              });
            } else {
              resolve(data.results[0].prefecture_id);
            }
          })
          // Ajaxリクエストが失敗した時発動
          .fail((data) => {
            alert('エラーが発生しました。再度画面を読み込んでお試しください');
            console.log(data);
          });
      });
    }
    //   市区町村
    async function getOrCreateMunicipalities(target) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/rest/restaurant/municipalities/?name=' + target,
          type: 'GET',
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
          // Ajaxリクエストが成功した時発動
          .done((data) => {
            if (data.count === 0) {
              let postData = { name: target };
              createData(postData, 'municipalities').then((res) => {
                resolve(res.municipalities_id);
              });
            } else {
              resolve(data.results[0].municipalities_id);
            }
          })
          // Ajaxリクエストが失敗した時発動
          .fail((data) => {
            alert('エラーが発生しました。再度画面を読み込んでお試しください');
            console.log(data);
          });
      });
    }

    //   町名
    async function getOrCreateStreetName(target) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/rest/restaurant/street-name/?name=' + target,
          type: 'GET',
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
          // Ajaxリクエストが成功した時発動
          .done((data) => {
            if (data.count === 0) {
              let postData = { name: target };
              createData(postData, 'street-name').then((res) => {
                resolve(res.street_name_id);
              });
            } else {
              resolve(data.results[0].street_name_id);
            }
          })
          // Ajaxリクエストが失敗した時発動
          .fail((data) => {
            alert('エラーが発生しました。再度画面を読み込んでお試しください');
            console.log(data);
          });
      });
    }

    //   郵便番号を含む住所
    async function getOrCreateAddress(target) {
      return new Promise((resolve, reject) => {
        let parm =
          'zip_code=' +
          target.zip_code +
          '&municipalities=' +
          target.municipalities +
          '&prefecture=' +
          target.prefecture +
          '&streetName=' +
          target.street_name;

        $.ajax({
          url: '/rest/restaurant/address/?' + parm,
          type: 'GET',
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
          // Ajaxリクエストが成功した時発動
          .done((data) => {
            if (data.count === 0) {
              createData(target, 'address').then((rs) => {
                resolve({ data: rs, created: true });
              });
            } else {
              resolve({ data: data, created: false });
            }
          })
          // Ajaxリクエストが失敗した時発動
          .fail((data) => {
            alert('エラーが発生しました。再度画面を読み込んでお試しください');
            console.log(data);
          });
      });
    }

    function createData(data, url) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: '/rest/restaurant/' + url + '/',
          type: 'POST',
          data: data,
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
          // Ajaxリクエストが成功した時発動
          .done((data) => {
            resolve(data);
          })
          // Ajaxリクエストが失敗した時発動
          .fail((data) => {
            alert('エラーが発生しました。再度画面を読み込んでお試しください');
            console.log(data);
          });
      });
    }
    getPrefectureList();
    // 都道府県一覧取得
    function getPrefectureList() {
      let page = 1;
      let prefectureList = null;

      function getNextData() {
        $.ajax({
          url: '/rest/restaurant/prefecture/?page=' + page,
          type: 'GET',
          async: true,
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
          // Ajaxリクエストが成功した時発動
          .done((data) => {
            data.results.forEach((v) => {
              $('#serchPrefecture').append(
                $(
                  '<option value="' +
                    v.prefecture_id +
                    '">' +
                    v.name +
                    '</option>'
                )
              );
              // serchText;
            });
            page++;
            if (data.next !== null) {
              getNextData();
            }
          })
          // Ajaxリクエストが失敗した時発動
          .fail((data) => {
            alert('エラーが発生しました。再度画面を読み込んでお試しください');
            console.log(data);
          });
      }
      getNextData();
    }

    function getData() {
      // 検索文字列
      let serchText = $('#serchText').val();
      // 都道府県の絞込み
      let serchPrefecture = $('#serchPrefecture option:checked').val();
      //   ページ
      let page = Number($('#nextPage').val());

      serchText = serchText.replace(/　/g, ' ');

      $.ajax({
        url:
          '/rest/restaurant/ro/?search=' +
          serchText +
          '&address__prefecture=' +
          serchPrefecture +
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
            }

            cardBody =
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
              v.comment +
              '</p>' +
              '<a href="/restaurant/' +
              v.restaurant_id +
              '/" class="btn btn-outline-info">支援する>></a>' +
              '</div>' +
              '<div class="card-footer">' +
              '<!-- 住所 -->' +
              '<small class="text-muted">' +
              v.address.prefecture.name +
              ' | ' +
              v.address.municipalities.name +
              '</small>' +
              '</div>' +
              '</div>' +
              cardBody;
            if (cnt % 3 === 0) {
              $('#serchResult')
                .append('<div class="card-deck">' + cardBody + '</div>')
                .hide()
                .fadeIn(500);
              cardBody = '';
            }
            cnt++;
          });
          if (cardBody) {
            $('#serchResult')
              .append('<div class="card-deck">' + cardBody + '</div>')
              .hide()
              .fadeIn(500);
          }

          if (data.next !== null) {
            $('#nextPage').val(page + 1);
          } else {
            $('#getNextPage').css('display', 'none');
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
  });
});

//
