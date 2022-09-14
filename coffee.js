$(function() {
    function beerRise() {
      $('.coffee').addClass('fill');
    }
    function pourBeer() {
      $('.pour').addClass('pouring');
      beerRise();
      setTimeout(function() {
        $('.pour').addClass('end');
      }, 1500);
    }
    setTimeout(function() {
      pourBeer();
    }, 1500);
  });