$(documen).ready(function () {
  let ids = {};
  $('input[type=checkbox]').click(function () {
    if (this.checked) {
      ids[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ids[$(this).data('id')
    }
    
