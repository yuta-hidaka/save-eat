$(document).ready(function () {
  // placehoplderの追加

  $('#id_name').attr('placeholder', 'Bar OOOO');
  $('#id_owner').attr('placeholder', '山田　太郎');
  $('#id_street_num').attr('placeholder', '兜通り 1-2-3');
  $('#id_bldg').attr('placeholder', '兜ビル');
  $('#id_web_url').attr('placeholder', 'https://save-eat.me');
  $('#id_phone').attr('placeholder', '00012349281');
  $('#id_email').attr('placeholder', 'info@save-eat.me');
  $('#id_comment').attr(
    'placeholder',
    '創業OO年のお店です。カクテルが得意です。コロナの影響で、休業に追い込まれています。'
  );
  $('#id_benefits').attr(
    'placeholder',
    '一口5000円で6000円分の飲食が可能です。'
  );
  $('#id_bank_name').attr('placeholder', 'OOO銀行');
  $('#id_branch').attr('placeholder', 'OOO支店');
  $('#id_account_name').attr('placeholder', 'ヤマダ　タロウ');
  $('#id_account_num').attr('placeholder', '123498761234');
  $('#id_account_type').attr('placeholder', '普通');
  $('#id_limit_to').attr('type', 'date');

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
          let prefecture_id = null;
          let municipalities_id = null;
          let streetName_id = null;
          let address_id = null;
          $('#zipCodeIncorrect').remove();
          $('#disp_prefecture').html(prefecture);
          $('#disp_municipalities').html(municipalities);
          $('#disp_street_name').html(streetName);

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
          $('#zipCode').val('');
          $('#zipCode').before(
            '<p class="text-danger" id="zipCodeIncorrect">郵便番号が正しくありません。</p>'
          );
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
});

//
