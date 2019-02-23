$(document).ready(function () {
  /*check the aminity */
  var addCheck = function() {
    let list = [];
    $('input[type=checkbox]').each(function () {
      if (this.checked) {
        list.push($(this).attr('data-name'));
      }
    });
    $('div.amenities > h4').text(list.join(', '));
  }
  $('input[type=checkbox]').on('click', addCheck);
  /* update status */
  let url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function(status) {
    if (status === 'success') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});

/*
$(documen).ready(function () {
  let ids = {};
  $('input[type=checkbox]').click(function () {
    if (this.checked) {
      ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ids[$(this).data('id')
    }
*/
