$(function() {

  $('#post-comment').hide();

  $('#btn-comment').on('click', function(evt) {
    evt.preventDefault();
    $('#post-comment').show();
  });

});
