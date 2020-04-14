$(document).ready(function () {
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
            console.log(data);
            let postData = { name: target };
            createData(postData, 'prefecture').then((res) => {
              console.log(res);
              resolve(res.prefecture_id);
            });
          } else {
            console.log('exsit');
            console.log(data);
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
            console.log(data);
            let postData = { name: target };
            createData(postData, 'municipalities').then((res) => {
              console.log(res);
              resolve(res.municipalities_id);
            });
          } else {
            console.log('exsit');
            console.log(data);
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
            console.log(data);
            let postData = { name: target };
            createData(postData, 'street-name').then((res) => {
              console.log(res);
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
          console.log('create data');
          console.log(data);
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
});

//
