$(document).ready(function () {
  /* check the aminity */
  let idList = [];
  let list = [];
  function addCheck () {
    idList = [];
    list = [];
    $('input[type=checkbox]').each(function () {
      if (this.checked) {
        list.push($(this).attr('data-name'));
        idList.push($(this).attr('data-id'));
      }
    });
  }
  let adCheck = function () {
    addCheck();
    $('div.amenities > h4').text(list.join(', '));
  };
  let offCheck = function () {
    list = [];
    addCheck();
    $('div.amenities > h4').text(list.join(', '));
  };
  $('input[type=checkbox]').on('click', adCheck);
  $('input[type=checkbox]').off('click', offCheck);
  /* Update status */
  let url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (status) {
    if (status.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  /* search place handling */
  function getPlace (dict) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(dict),
      success: function (data, textStatus, jQxhr) {
        data.sort(function (a, b) {
          let keyA = a.name.toUpperCase();
          let keyB = b.name.toUpperCase();
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        for (let i in data) {
          let d = data[i];
          let userUrl = 'http://0.0.0.0:5001/api/v1/users/' + d.user_id;
          $.get(userUrl, function (data) {
            let user = data.first_name + ' ' + data.last_name;
            d.user_name = user;
          });
        }
        for (let i in data) {
          $('section.places').append('<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + 'Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + 'Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + 'Bathroom</div></div><div class="user"><strong>Owner: ' + data[i].user + '</strong></div><div class="description">' + data[i].description + '</div></article>');
        }
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }
  $('button').click(function () {
    addCheck();
    let amensDic = { 'amenities': [] };
    for (let i in idList) {
      amensDic['amenities'].push(idList[i]);
    }
    $('article').remove();
    getPlace(amensDic);
    idList = [];
    list = [];
  });
  getPlace({});
});
