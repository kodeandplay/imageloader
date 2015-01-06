$(function() {

  $('#post-comment').hide();

  $('#btn-comment').on('click', function(evt) {
    evt.preventDefault();
    $('#post-comment').show();
  });

  $('#btn-like').on('click', function(evt) {
    evt.preventDefault();

    var imgId = $(this).data('id');

    $.post('/images/' + imgId + '/like').done(function(data) {
      $('.likes-count').text(data.likes);
    });
  });

});
