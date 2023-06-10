$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const inputedChars = $(this).val().length
    const remChars = 140 - inputedChars;
    $(".counter").text(remChars);

    if (remChars < 0) {
      $('.counter').addClass("exceeded");
    } else {
      $('.counter').removeClass("exceeded");
    }
  });
}); 